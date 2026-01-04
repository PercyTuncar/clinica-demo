import { useCallback } from "react";
import { useDoctorStore } from "@/lib/stores/useDoctorStore";
import { useAppointmentStore } from "@/lib/stores/useAppointmentStore";
import { format, addMinutes, isBefore, parse, isSameDay, startOfDay } from "date-fns";

export interface TimeSlot {
    time: string; // "09:00"
    available: boolean;
}

export function useAvailability() {
    const { getDoctorById } = useDoctorStore();
    const { getAppointmentsByDoctor } = useAppointmentStore();

    const getAvailableSlots = useCallback((doctorId: string, date: Date, duration: number): TimeSlot[] => {
        const doctor = getDoctorById(doctorId);
        if (!doctor) return [];

        // 1. Get working hours for the day of week
        const dayName = format(date, 'eeee').toLowerCase(); // 'monday', 'tuesday'...
        const schedule = doctor.workingHours[dayName];

        if (!schedule) return []; // Not working

        // Check blocked dates
        const dateString = format(date, 'yyyy-MM-dd');
        if (doctor.blockedDates.includes(dateString)) return [];

        const slots: TimeSlot[] = [];
        const startTime = parse(schedule.start, 'HH:mm', date);
        const endTime = parse(schedule.end, 'HH:mm', date);

        // Break times
        let breakStart: Date | null = null;
        let breakEnd: Date | null = null;
        if (schedule.break) {
            const [bs, be] = schedule.break.split('-');
            breakStart = parse(bs, 'HH:mm', date);
            breakEnd = parse(be, 'HH:mm', date);
        }

        // 2. Get existing appointments
        const appointments = getAppointmentsByDoctor(doctorId).filter(appt =>
            appt.status !== 'cancelled' &&
            appt.status !== 'no-show' &&
            isSameDay(parse(appt.date, 'yyyy-MM-dd', new Date()), date)
        );

        // 3. Generate slots
        let currentSlot = startTime;
        const now = new Date();
        const isToday = isSameDay(date, now);

        // Loop until we can't fit another appointment before end time
        while (addMinutes(currentSlot, duration) <= endTime) {
            const slotEnd = addMinutes(currentSlot, duration);
            const slotTimeString = format(currentSlot, 'HH:mm');

            let isAvailable = true;

            // Rule: Past time
            if (isToday && isBefore(currentSlot, now)) {
                isAvailable = false;
            }

            // Rule: Lunch Break
            if (breakStart && breakEnd) {
                // If slot overlaps with break
                // Simple check: if slot starts inside break OR slot ends inside break
                if (
                    (currentSlot >= breakStart && currentSlot < breakEnd) ||
                    (slotEnd > breakStart && slotEnd <= breakEnd)
                ) {
                    isAvailable = false;
                }
            }

            // Rule: Existing Appointments
            // Buffer: 15 min
            const buffer = 15;

            for (const appt of appointments) {
                const apptStart = parse(appt.time, 'HH:mm', date);
                const apptEnd = addMinutes(apptStart, appt.duration + buffer); // Add buffer to appointment end

                // Conflict if ranges overlap
                if (
                    (currentSlot >= apptStart && currentSlot < apptEnd) ||
                    (slotEnd > apptStart && slotEnd <= apptEnd)
                ) {
                    isAvailable = false;
                    break;
                }
            }

            slots.push({ time: slotTimeString, available: isAvailable });

            // Next slot logic: Step by 30 mins or by duration?
            // PRD 6.1 says "Intervalos de citas: Definido por duración del servicio".
            // "Limpieza: 45 min -> Slots cada 45 min".
            // "Buffer automático: 15 minutos entre citas del mismo doctor".
            // If we step by duration, we might miss efficient packing if we don't include buffer in step?
            // Actually typically slots are fixed intervals (e.g. every 30 mins) and we check if DURATION fits.
            // But PRD says "Slots cada 45 min" for 45 min service.
            // Let's step by `duration`.
            // Wait, if I have a 45 min slot at 9:00, next one starts at 9:45?
            // PRD 502: "Dividir en intervalos de 30 minutos".
            // "Para cada slot, verificar: ¿La cita anterior termina a tiempo? (considerar duración + buffer)".
            // So base slots are 30 mins (fixed grid), but we check if `duration` fits starting from that slot?
            // "Paso 3 ... Al seleccionar una fecha, mostrar slots de tiempo disponibles abajo -> Slots deben ser botones (ej: 9:00 AM, 9:30 AM...)"
            // So the GRID is 30 mins.

            currentSlot = addMinutes(currentSlot, 30);
        }

        return slots;
    }, [getDoctorById, getAppointmentsByDoctor]);

    return { getAvailableSlots };
}
