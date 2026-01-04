"use client";

import { useAuthStore } from "@/lib/stores/useAuthStore";
import { useAppointmentStore } from "@/lib/stores/useAppointmentStore";
import { usePatientStore } from "@/lib/stores/usePatientStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowRight, CheckCircle2 } from "lucide-react";
import { format, isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function DoctorAgenda() {
    const { user } = useAuthStore();
    const { appointments, updateStatus } = useAppointmentStore();
    const { getPatientById } = usePatientStore();

    if (!user || user.role !== 'doctor') {
        return <div className="p-8 text-center">Acceso restringido. Inicie sesión como doctor.</div>;
    }

    const today = new Date();

    // Filter for logged in doctor
    const myAppointments = appointments.filter(a =>
        a.doctorId === user.id &&
        (isSameDay(new Date(a.date), today) || new Date(a.date) >= today)
    ).sort((a, b) => new Date(a.date + 'T' + a.time).getTime() - new Date(b.date + 'T' + b.time).getTime());

    // Current or Next Appointment (Any future date)
    const nextAppointment = myAppointments.find(a =>
        a.status === 'confirmed' || a.status === 'checked-in' || a.status === 'pending'
    );

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Hola, {user.name}</h1>
                <p className="text-slate-500">
                    Agenda para hoy, {format(today, "eeee d 'de' MMMM", { locale: es })}
                </p>
            </div>

            {nextAppointment && (
                <Card className="border-teal-500 border-l-4 shadow-lg bg-teal-50/30">
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center text-teal-800">
                            Siguiente Paciente
                            <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-200">
                                {isSameDay(new Date(nextAppointment.date), today) ? 'HOY' : format(new Date(nextAppointment.date), 'dd MMM', { locale: es })} • {nextAppointment.time}
                            </Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-full bg-teal-200 flex items-center justify-center text-teal-700">
                                    <User className="h-8 w-8" />
                                </div>
                                <div>
                                    {(() => {
                                        const patient = getPatientById(nextAppointment.patientId);
                                        return (
                                            <>
                                                <h3 className="text-xl font-bold text-slate-900">
                                                    {patient ? `${patient.firstName} ${patient.lastName}` : 'Invitado'}
                                                </h3>
                                                <p className="text-slate-500 flex items-center gap-2">
                                                    RUT: {patient?.rut || 'N/A'} • {patient?.phone}
                                                </p>
                                            </>
                                        );
                                    })()}
                                </div>
                            </div>
                            <Link href={`/doctor/consultation/${nextAppointment.id}`}>
                                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 gap-2 shadow-lg shadow-teal-500/20">
                                    Iniciar Consulta <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Calendar className="h-5 w-5" /> Tu Agenda
                </h2>

                {myAppointments.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center text-slate-500">
                            No tienes citas programadas para hoy ni los próximos días.
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {myAppointments.map(appt => {
                            const patient = getPatientById(appt.patientId);
                            const isToday = isSameDay(new Date(appt.date), today);

                            return (
                                <div key={appt.id} className={`flex items-center justify-between p-4 border rounded-lg ${isToday ? 'bg-white' : 'bg-slate-50'}`}>
                                    <div className="flex items-center gap-6">
                                        <div className="text-center min-w-[80px]">
                                            <div className="font-bold text-lg text-slate-900">{appt.time}</div>
                                            <div className={`text-xs ${isToday ? 'text-teal-600 font-bold' : 'text-slate-500'}`}>
                                                {isToday ? 'HOY' : format(new Date(appt.date), 'dd MMM')}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">
                                                {patient ? `${patient.firstName} ${patient.lastName}` : 'Invitado'}
                                            </p>
                                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                                <Clock className="h-3 w-3" /> {appt.duration} min • {appt.status.toUpperCase()}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {appt.status === 'completed' ? (
                                            <Badge variant="outline" className="text-green-600 border-green-200">
                                                <CheckCircle2 className="h-3 w-3 mr-1" /> Completada
                                            </Badge>
                                        ) : (
                                            <Link href={`/doctor/consultation/${appt.id}`}>
                                                <Button variant="outline" size="sm">Ver Ficha</Button>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
