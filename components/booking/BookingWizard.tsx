"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useUIStore } from "@/lib/stores/useUIStore";
import { Button } from "@/components/ui/button";
import { Step1Service } from "./steps/Step1Service";
import { Step2Doctor } from "./steps/Step2Doctor";
import { Step3DateTime } from "./steps/Step3DateTime";
import { Step4Patient, PatientFormData } from "./steps/Step4Patient";
import { Step5Success } from "./steps/Step5Success";
import { useAppointmentStore } from "@/lib/stores/useAppointmentStore";
import { useServiceStore } from "@/lib/stores/useServiceStore";
import { useDoctorStore } from "@/lib/stores/useDoctorStore";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Check, ChevronRight, Sparkles, User, Calendar, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

// Step Types
type Step = 1 | 2 | 3 | 4 | 5;

interface BookingState {
    serviceId: string | null;
    doctorId: string | null;
    date: Date | null;
    time: string | null;
    patientData: PatientFormData | null;
    bookingCode: string | null;
}

export function BookingWizard() {
    const { isBookingOpen, closeBooking, preselectedServiceId } = useUIStore();
    const { addAppointment } = useAppointmentStore();
    const { getServiceById } = useServiceStore();
    const { getDoctorById } = useDoctorStore();

    const [step, setStep] = useState<Step>(1);
    const [data, setData] = useState<BookingState>({
        serviceId: null,
        doctorId: null,
        date: null,
        time: null,
        patientData: null,
        bookingCode: null
    });

    const selectedService = data.serviceId ? getServiceById(data.serviceId) : null;
    const selectedDoctor = data.doctorId ? getDoctorById(data.doctorId) : null;

    useEffect(() => {
        if (isBookingOpen) {
            setStep(1);
            setData({
                serviceId: preselectedServiceId || null,
                doctorId: false ? null : null, // Reset logic simplified
                date: null,
                time: null,
                patientData: null,
                bookingCode: null
            });
            // Handle preselection if needed, though state reset above handles baseline
            if (preselectedServiceId) {
                setData(prev => ({ ...prev, serviceId: preselectedServiceId }));
            }
        }
    }, [isBookingOpen, preselectedServiceId]);

    const handleCreateAppointment = async (patientData: PatientFormData) => {
        if (!data.serviceId || !data.doctorId || !data.date || !data.time) return;
        const service = getServiceById(data.serviceId);
        if (!service) return;

        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing

        const bookingCode = `RES-${Math.floor(Math.random() * 1000000)}`;
        const dateStr = format(data.date, 'yyyy-MM-dd');

        addAppointment({
            id: `APPT-${Date.now()}`,
            serviceId: data.serviceId,
            doctorId: data.doctorId,
            patientId: 'PAT-GUEST',
            date: dateStr,
            time: data.time,
            duration: service.duration,
            status: 'pending',
            createdAt: new Date().toISOString(),
            source: 'web',
            price: service.price,
            paid: false,
            statusHistory: [{
                status: 'pending',
                timestamp: new Date().toISOString(),
                by: 'system'
            }]
        });

        setData(prev => ({ ...prev, patientData, bookingCode }));
        setStep(5);
    };

    const handleBack = () => {
        if (step > 1) setStep(prev => (prev - 1) as Step);
    };

    const steps = [
        { id: 1, title: 'Servicio', icon: Sparkles },
        { id: 2, title: 'Doctor', icon: User },
        { id: 3, title: 'Fecha', icon: Calendar },
        { id: 4, title: 'Datos', icon: FileText },
    ];

    return (
        <Dialog open={isBookingOpen} onOpenChange={(open) => !open && closeBooking()}>
            <DialogContent className="sm:max-w-[900px] h-[85vh] sm:h-[90vh] p-0 gap-0 overflow-hidden flex flex-col md:flex-row bg-slate-50 border-none shadow-2xl rounded-xl sm:rounded-2xl">
                <DialogTitle className="sr-only">Asistente de Reserva de Cita</DialogTitle>
                <DialogDescription className="sr-only">
                    Formulario paso a paso para agendar una cita médica seleccionando servicio, doctor y horario.
                </DialogDescription>

                {/* Sidebar Summary (Hidden on mobile, visible on md+) */}
                <div className="hidden md:flex flex-col w-[280px] bg-slate-900 text-slate-300 p-6 border-r border-slate-800">
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="h-8 w-8 bg-teal-500 rounded-lg flex items-center justify-center font-bold text-white">CD</div>
                            <span className="font-bold text-white tracking-tight">Clínica Dental</span>
                        </div>
                        <p className="text-xs text-slate-500">Reserva tu cita en línea</p>
                    </div>

                    <div className="space-y-6 flex-1">
                        {/* Summary Items */}
                        <div className={cn("space-y-4 transition-all duration-500", step === 1 && "opacity-50")}>
                            {/* Service Summary */}
                            <div className={cn("p-3 rounded-xl border border-slate-800 bg-slate-800/50 transition-all", data.serviceId ? "border-teal-900/50 bg-teal-900/10" : "")}>
                                <p className="text-xs font-semibold uppercase text-slate-500 mb-1">Tratamiento</p>
                                {selectedService ? (
                                    <div className="text-white font-medium flex justify-between items-center">
                                        <span>{selectedService.name}</span>
                                        <Check className="h-4 w-4 text-teal-500" />
                                    </div>
                                ) : (
                                    <p className="text-slate-600 italic text-sm">Sin seleccionar</p>
                                )}
                            </div>

                            {/* Doctor Summary */}
                            <div className={cn("p-3 rounded-xl border border-slate-800 bg-slate-800/50 transition-all", data.doctorId ? "border-teal-900/50 bg-teal-900/10" : "")}>
                                <p className="text-xs font-semibold uppercase text-slate-500 mb-1">Especialista</p>
                                {selectedDoctor || data.doctorId === 'any' ? (
                                    <div className="text-white font-medium flex justify-between items-center">
                                        <span>{data.doctorId === 'any' ? 'Sin preferencia' : selectedDoctor?.name}</span>
                                        <Check className="h-4 w-4 text-teal-500" />
                                    </div>
                                ) : (
                                    <p className="text-slate-600 italic text-sm">Sin seleccionar</p>
                                )}
                            </div>

                            {/* Date Summary */}
                            <div className={cn("p-3 rounded-xl border border-slate-800 bg-slate-800/50 transition-all", data.date ? "border-teal-900/50 bg-teal-900/10" : "")}>
                                <p className="text-xs font-semibold uppercase text-slate-500 mb-1">Fecha y Hora</p>
                                {data.date && data.time ? (
                                    <div className="text-white font-medium">
                                        <div className="flex justify-between items-center">
                                            <span>{format(data.date, "d MMM", { locale: es })} - {data.time}</span>
                                            <Check className="h-4 w-4 text-teal-500" />
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-slate-600 italic text-sm">Sin seleccionar</p>
                                )}
                            </div>
                        </div>

                        {/* Total or Price Estimation */}
                        {selectedService && (
                            <div className="mt-auto pt-6 border-t border-slate-800">
                                <div className="flex justify-between items-end">
                                    <span className="text-sm text-slate-400">Total Estimado</span>
                                    <span className="text-2xl font-bold text-white">${selectedService.price.toLocaleString('es-CL')}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col h-full bg-white relative">
                    {/* Stepper Header */}
                    {step < 5 && (
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur z-10 sticky top-0">
                            <div className="flex items-center gap-2">
                                {steps.map((s, i) => (
                                    <div key={s.id} className="flex items-center">
                                        <div className={cn(
                                            "h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                                            step === s.id ? "bg-teal-600 text-white shadow-lg shadow-teal-500/30 scale-110" :
                                                step > s.id ? "bg-teal-100 text-teal-700" : "bg-slate-100 text-slate-400"
                                        )}>
                                            {step > s.id ? <Check className="h-4 w-4" /> : s.id}
                                        </div>
                                        {i < steps.length - 1 && (
                                            <div className={cn("h-1 w-6 mx-2 rounded-full", step > s.id ? "bg-teal-100" : "bg-slate-100")} />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm font-bold text-slate-700">
                                {steps.find(s => s.id === step)?.title}
                            </div>
                        </div>
                    )}

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-4 sm:p-8 relative scroll-smooth">
                        {step === 1 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">Selecciona tu tratamiento</h2>
                                <p className="text-slate-500 mb-6">Elige el servicio que necesitas para hoy</p>
                                <Step1Service
                                    selectedServiceId={data.serviceId}
                                    onSelect={(id) => { setData(prev => ({ ...prev, serviceId: id })); setStep(2); }}
                                />
                            </div>
                        )}

                        {step === 2 && data.serviceId && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">Elige a tu especialista</h2>
                                <p className="text-slate-500 mb-6">Contamos con los mejores profesionales</p>
                                <Step2Doctor
                                    serviceId={data.serviceId}
                                    selectedDoctorId={data.doctorId}
                                    onSelect={(id) => {
                                        const finalId = id === 'any' ? (getDoctorById('DOC-001') ? 'DOC-001' : id) : id;
                                        setData(prev => ({ ...prev, doctorId: finalId }));
                                        setStep(3);
                                    }}
                                />
                                <div className="mt-6">
                                    <Button variant="ghost" onClick={handleBack} className="text-slate-400 hover:text-slate-600">Atrás</Button>
                                </div>
                            </div>
                        )}

                        {step === 3 && data.doctorId && data.serviceId && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">Fecha y Hora</h2>
                                <p className="text-slate-500 mb-6">Agenda el momento que mejor te acomode</p>
                                <Step3DateTime
                                    doctorId={data.doctorId}
                                    serviceId={data.serviceId}
                                    selectedDate={data.date}
                                    selectedTime={data.time}
                                    onSelect={(date, time) => {
                                        setData(prev => ({ ...prev, date, time }));
                                        setStep(4);
                                    }}
                                />
                                <div className="mt-6">
                                    <Button variant="ghost" onClick={handleBack} className="text-slate-400 hover:text-slate-600">Atrás</Button>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">Tus Datos</h2>
                                <p className="text-slate-500 mb-6">Completa la información para confirmar</p>
                                <Step4Patient
                                    onSubmit={handleCreateAppointment}
                                />
                                <div className="mt-4">
                                    <Button variant="ghost" onClick={handleBack} className="text-slate-400 hover:text-slate-600">Atrás</Button>
                                </div>
                            </div>
                        )}

                        {step === 5 && data.bookingCode && (
                            <Step5Success
                                bookingCode={data.bookingCode}
                                date={data.date ? format(data.date, 'dd MMMM yyyy', { locale: es }) : ''}
                                time={data.time || ''}
                                doctorName={selectedDoctor?.name || 'Doctor'}
                                serviceName={selectedService?.name || 'Servicio'}
                                onClose={closeBooking}
                            />
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
