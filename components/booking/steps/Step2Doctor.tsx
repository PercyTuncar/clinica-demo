"use client";

import { useDoctorStore } from "@/lib/stores/useDoctorStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Check, UserCheck, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step2DoctorProps {
    serviceId: string;
    selectedDoctorId: string | null;
    onSelect: (doctorId: string) => void;
}

export function Step2Doctor({ serviceId, selectedDoctorId, onSelect }: Step2DoctorProps) {
    const { getDoctorsByService } = useDoctorStore();
    const doctors = getDoctorsByService(serviceId).filter(d => d.active);

    if (doctors.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                <UserCheck className="h-12 w-12 mb-4 opacity-50" />
                <p>No hay doctores disponibles para este servicio actualmente.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
                {doctors.map((doctor) => {
                    const isSelected = selectedDoctorId === doctor.id;

                    return (
                        <div
                            key={doctor.id}
                            onClick={() => onSelect(doctor.id)}
                            className={cn(
                                "group cursor-pointer rounded-2xl border-2 p-5 transition-all duration-300 hover:shadow-lg relative bg-white",
                                isSelected
                                    ? "border-teal-600 ring-4 ring-teal-50 bg-white"
                                    : "border-slate-100 hover:border-teal-200"
                            )}
                        >
                            <div className="flex items-start gap-4">
                                <Avatar className={cn(
                                    "h-16 w-16 border-4 shadow-sm transition-colors",
                                    isSelected ? "border-teal-100" : "border-white"
                                )}>
                                    <AvatarImage src={doctor.avatar} />
                                    <AvatarFallback className="bg-slate-100 text-slate-500 text-lg font-bold">{doctor.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>

                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-lg text-slate-900 truncate">{doctor.name}</h4>
                                    <p className="text-sm font-medium text-teal-600 mb-2 truncate">{doctor.specialty}</p>

                                    <div className="flex items-center gap-3 text-xs">
                                        <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-bold">
                                            <Star className="h-3 w-3 fill-current" />
                                            {doctor.rating}
                                        </div>
                                        <span className="text-slate-400">{doctor.totalPatients} pacientes</span>
                                    </div>
                                </div>

                                <div className={cn(
                                    "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all",
                                    isSelected ? "border-teal-600 bg-teal-600 text-white" : "border-slate-200 text-transparent"
                                )}>
                                    <Check className="h-3 w-3" />
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2 text-xs text-slate-500">
                                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                Disponible Hoy
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Any Doctor Option */}
            <div
                onClick={() => onSelect('any')}
                className={cn(
                    "p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between group",
                    selectedDoctorId === 'any'
                        ? "border-teal-600 bg-teal-50"
                        : "border-dashed border-slate-300 bg-slate-50/50 hover:bg-white hover:border-teal-300"
                )}
            >
                <div className="flex items-center gap-4">
                    <div className={cn(
                        "h-12 w-12 rounded-full flex items-center justify-center transition-colors",
                        selectedDoctorId === 'any' ? "bg-teal-200 text-teal-800" : "bg-slate-200 text-slate-500 group-hover:bg-teal-100 group-hover:text-teal-600"
                    )}>
                        <CalendarDays className="h-6 w-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-700 group-hover:text-teal-700 transition-colors">Sin preferencia de especialista</h4>
                        <p className="text-sm text-slate-500">Asignaremos al doctor con la disponibilidad más próxima</p>
                    </div>
                </div>
                {selectedDoctorId === 'any' && (
                    <div className="h-6 w-6 rounded-full bg-teal-600 text-white flex items-center justify-center">
                        <Check className="h-3 w-3" />
                    </div>
                )}
            </div>
        </div>
    );
}
