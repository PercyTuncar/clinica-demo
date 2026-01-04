"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, Calendar, Clock, MapPin } from "lucide-react";

interface Step5SuccessProps {
    bookingCode: string;
    date: string;
    time: string;
    doctorName: string;
    serviceName: string;
    onClose: () => void;
}

export function Step5Success({ bookingCode, date, time, doctorName, serviceName, onClose }: Step5SuccessProps) {
    return (
        <div className="text-center py-8 space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="flex justify-center">
                <CheckCircle2 className="h-20 w-20 text-emerald-500 animate-bounce" />
            </div>

            <div className="space-y-2">
                <h2 className="text-3xl font-bold text-slate-900">¡Cita Confirmada!</h2>
                <p className="text-slate-600">Hemos enviado los detalles a tu correo y WhatsApp.</p>
            </div>

            <div className="bg-slate-50 border-2 border-dashed border-teal-200 rounded-xl p-6 max-w-sm mx-auto">
                <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Código de Reserva</div>
                <div className="text-2xl font-mono font-bold text-teal-600 mb-6">{bookingCode}</div>

                <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                            <Calendar className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Fecha</p>
                            <p className="font-medium text-slate-900">{date}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                            <Clock className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Hora</p>
                            <p className="font-medium text-slate-900">{time}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                            <MapPin className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Ubicación</p>
                            <p className="font-medium text-slate-900">Av. Providencia 1234, Of. 505</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t text-sm">
                    <p className="font-bold text-slate-900">{serviceName}</p>
                    <p className="text-slate-500">con {doctorName}</p>
                </div>
            </div>

            <div className="flex gap-4 justify-center pt-4">
                <Button variant="outline" onClick={() => window.print()}>
                    Imprimir
                </Button>
                <Button onClick={onClose} className="bg-teal-600 hover:bg-teal-700 text-white">
                    Finalizar
                </Button>
            </div>
        </div>
    );
}
