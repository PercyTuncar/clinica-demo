import { create } from 'zustand';

import { Appointment, AppointmentStatus } from '@/lib/types';
import { addDays, subDays, startOfDay, addHours } from 'date-fns';

interface AppointmentState {
    appointments: Appointment[];
    addAppointment: (appointment: Appointment) => void;
    addToWaitlist: (appt: Appointment) => void;
    updateStatus: (id: string, status: AppointmentStatus, userId: string, reason?: string) => void;
    getAppointmentsByDoctor: (doctorId: string) => Appointment[];
    getAppointmentsByDate: (date: string) => Appointment[];
}

const today = startOfDay(new Date());

const MOCK_APPOINTMENTS: Appointment[] = [
    // Pending
    {
        id: 'APPT-20260107-024',
        serviceId: 'SVC-001',
        doctorId: 'DOC-004',
        patientId: 'PAT-123',
        date: '2026-01-07',
        time: '10:00',
        duration: 45,
        status: 'pending',
        createdAt: '2026-01-04T10:00:00Z',
        source: 'web',
        price: 45000,
        paid: false,
        notes: 'Sensibilidad dental',
        statusHistory: [{ status: 'pending', timestamp: '2026-01-04T10:00:00Z', by: 'system' }]
    },
    {
        id: 'APPT-PEND-002',
        serviceId: 'SVC-002',
        doctorId: 'DOC-001',
        patientId: 'PAT-124',
        date: '2026-01-08',
        time: '11:00',
        duration: 30,
        status: 'pending',
        createdAt: '2026-01-04T11:00:00Z',
        source: 'phone',
        price: 30000,
        paid: false,
        statusHistory: [{ status: 'pending', timestamp: '2026-01-04T11:00:00Z', by: 'USR-001' }]
    },
    // Confirmed (Future)
    {
        id: 'APPT-CONF-001',
        serviceId: 'SVC-005',
        doctorId: 'DOC-002',
        patientId: 'PAT-125',
        date: '2026-01-09',
        time: '09:00',
        duration: 60,
        status: 'confirmed',
        createdAt: '2026-01-03T09:00:00Z',
        source: 'web',
        price: 150000,
        paid: false,
        statusHistory: [
            { status: 'pending', timestamp: '2026-01-03T09:00:00Z', by: 'system' },
            { status: 'confirmed', timestamp: '2026-01-04T09:00:00Z', by: 'USR-001' }
        ]
    },
    // Completed (Past)
    {
        id: 'APPT-COMP-001',
        serviceId: 'SVC-001',
        doctorId: 'DOC-004',
        patientId: 'PAT-124',
        date: '2025-12-15',
        time: '14:00',
        duration: 45,
        status: 'completed',
        createdAt: '2025-12-10T14:00:00Z',
        source: 'web',
        price: 45000,
        paid: true,
        paymentMethod: 'debit-card',
        statusHistory: []
    },
    // Cancelled
    {
        id: 'APPT-CANC-001',
        serviceId: 'SVC-003',
        doctorId: 'DOC-004',
        patientId: 'PAT-123',
        date: '2025-12-20',
        time: '16:00',
        duration: 60,
        status: 'cancelled',
        createdAt: '2025-12-18T10:00:00Z',
        source: 'phone',
        price: 120000,
        paid: false,
        cancelReason: 'Enfermedad',
        statusHistory: []
    }
];

export const useAppointmentStore = create<AppointmentState>()((set, get) => ({
    appointments: MOCK_APPOINTMENTS,
    addAppointment: (appt) => set((state) => ({ appointments: [...state.appointments, appt] })),
    addToWaitlist: (appt: Appointment) => set((state) => ({
        appointments: [...state.appointments, { ...appt, status: 'waitlist' }]
    })),
    updateStatus: (id, status, userId, reason) => set((state) => ({
        appointments: state.appointments.map((a) => {
            if (a.id === id) {
                return {
                    ...a,
                    status,
                    cancelReason: reason || a.cancelReason,
                    statusHistory: [
                        ...a.statusHistory,
                        { status, timestamp: new Date().toISOString(), by: userId }
                    ]
                };
            }
            return a;
        })
    })),
    getAppointmentsByDoctor: (doctorId) => get().appointments.filter(a => a.doctorId === doctorId),
    getAppointmentsByDate: (date) => get().appointments.filter(a => a.date === date),
}));
