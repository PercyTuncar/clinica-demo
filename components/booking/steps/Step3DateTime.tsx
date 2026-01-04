"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useAvailability, TimeSlot } from "@/lib/hooks/useAvailability";
import { useServiceStore } from "@/lib/stores/useServiceStore";
import { addMonths, format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Clock, Calendar as CalendarIcon, Sunrise, Sun, Sunset } from "lucide-react";

interface Step3DateTimeProps {
    doctorId: string;
    serviceId: string;
    selectedDate: Date | null;
    selectedTime: string | null;
    onSelect: (date: Date, time: string) => void;
}

export function Step3DateTime({ doctorId, serviceId, selectedDate, selectedTime, onSelect }: Step3DateTimeProps) {
    const [date, setDate] = useState<Date | undefined>(selectedDate || undefined);
    const [slots, setSlots] = useState<TimeSlot[]>([]);
    const { getAvailableSlots } = useAvailability();
    const { getServiceById } = useServiceStore();

    const service = getServiceById(serviceId);

    useEffect(() => {
        if (date && doctorId && service) {
            const generatedSlots = getAvailableSlots(doctorId, date, service.duration);
            setSlots(generatedSlots);
        } else {
            setSlots([]);
        }
    }, [date, doctorId, service, getAvailableSlots]);

    const handleTimeSelect = (time: string) => {
        if (date) {
            onSelect(date, time);
        }
    };

    // Group slots by time of day
    const morningSlots = slots.filter(s => parseInt(s.time.split(':')[0]) < 12);
    const afternoonSlots = slots.filter(s => parseInt(s.time.split(':')[0]) >= 12 && parseInt(s.time.split(':')[0]) < 17);
    const eveningSlots = slots.filter(s => parseInt(s.time.split(':')[0]) >= 17);

    return (
        <div className="flex flex-col lg:flex-row gap-8 h-full">
            <div className="flex-1">
                <div className="bg-white border text-center rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-3 bg-slate-50 border-b">
                        <h4 className="font-semibold text-slate-700 flex items-center justify-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-teal-600" />
                            {date ? format(date, "MMMM yyyy", { locale: es }) : "Calendario"}
                        </h4>
                    </div>
                    <div className="p-4 flex justify-center">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(d) => { setDate(d); }}
                            disabled={(date) => date < new Date() || date > addMonths(new Date(), 3)}
                            initialFocus
                            className="rounded-md"
                        />
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                <h4 className="font-medium mb-4 text-slate-900 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-teal-600" />
                    Horarios Disponibles para el {date ? format(date, "d 'de' MMMM", { locale: es }) : "..."}
                </h4>

                {!date ? (
                    <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 p-8 text-center min-h-[300px]">
                        <CalendarIcon className="h-10 w-10 text-slate-300 mb-3" />
                        <p className="text-slate-500 font-medium">Selecciona un día en el calendario</p>
                        <p className="text-xs text-slate-400 mt-1">Verás los cupos disponibles aquí</p>
                    </div>
                ) : slots.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-red-100 rounded-2xl bg-red-50/30 p-8 text-center min-h-[300px]">
                        <p className="text-red-500 font-medium">No hay cupos disponibles</p>
                        <p className="text-xs text-red-400 mt-1">Intenta seleccionando otro día o doctor</p>
                    </div>
                ) : (
                    <div className="space-y-6 overflow-y-auto pr-2 max-h-[400px]">
                        {/* Morning */}
                        {morningSlots.length > 0 && (
                            <div>
                                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Sunrise className="h-3 w-3" /> Mañana
                                </h5>
                                <div className="grid grid-cols-3 gap-2">
                                    {morningSlots.map(slot => (
                                        <TimeButton key={slot.time} slot={slot} selectedTime={selectedTime} onClick={handleTimeSelect} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Afternoon */}
                        {afternoonSlots.length > 0 && (
                            <div>
                                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Sun className="h-3 w-3" /> Tarde
                                </h5>
                                <div className="grid grid-cols-3 gap-2">
                                    {afternoonSlots.map(slot => (
                                        <TimeButton key={slot.time} slot={slot} selectedTime={selectedTime} onClick={handleTimeSelect} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Evening */}
                        {eveningSlots.length > 0 && (
                            <div>
                                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Sunset className="h-3 w-3" /> Noche
                                </h5>
                                <div className="grid grid-cols-3 gap-2">
                                    {eveningSlots.map(slot => (
                                        <TimeButton key={slot.time} slot={slot} selectedTime={selectedTime} onClick={handleTimeSelect} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

function TimeButton({ slot, selectedTime, onClick }: { slot: TimeSlot, selectedTime: string | null, onClick: (t: string) => void }) {
    return (
        <Button
            variant="outline"
            disabled={!slot.available}
            onClick={() => onClick(slot.time)}
            className={cn(
                "w-full font-medium transition-all hover:scale-105",
                selectedTime === slot.time
                    ? "bg-teal-600 text-white border-teal-600 hover:bg-teal-700 shadow-md ring-2 ring-teal-100"
                    : "border-slate-200 text-slate-700 hover:border-teal-300 hover:text-teal-600"
            )}
        >
            {slot.time}
        </Button>
    )
}
