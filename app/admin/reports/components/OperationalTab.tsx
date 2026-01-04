"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useAppointmentStore } from "@/lib/stores/useAppointmentStore";
import { AlertCircle, Clock } from "lucide-react";

export default function OperationalTab() {
    const { appointments } = useAppointmentStore();

    // Calculate Cancellation Rate
    const total = appointments.length;
    const cancelled = appointments.filter(a => a.status === 'cancelled').length;
    const cancelRate = total > 0 ? ((cancelled / total) * 100).toFixed(1) : "0";

    // Filter Waitlist from appointments
    const waitlist = appointments.filter(a => a.status === 'waitlist');

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Tasa de Cancelación</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">{cancelRate}%</div>
                        <p className="text-xs text-red-500 flex items-center mt-1">
                            <AlertCircle className="h-3 w-3 mr-1" /> Principal motivo: "Falta de tiempo"
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Tiempo Promedio Consulta</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">38 min</div>
                        <p className="text-xs text-slate-500 mt-1">
                            Objetivo: 45 min
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">En Lista de Espera</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">{waitlist.length}</div>
                        <p className="text-xs text-blue-500 flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" /> Solicitudes activas
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Lista de Espera Activa</CardTitle>
                    <CardDescription>Pacientes esperando por un cupo disponible.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Paciente</TableHead>
                                <TableHead>Servicio</TableHead>
                                <TableHead>Doctor Preferido</TableHead>
                                <TableHead>Estado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {waitlist.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-slate-500">No hay pacientes en lista de espera</TableCell>
                                </TableRow>
                            ) : (
                                waitlist.map((appt) => (
                                    <TableRow key={appt.id}>
                                        <TableCell>{appt.date}</TableCell>
                                        <TableCell className="font-medium">{appt.patientId}</TableCell>
                                        <TableCell>{appt.serviceId}</TableCell>
                                        <TableCell>{appt.doctorId}</TableCell>
                                        <TableCell><Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">En espera</Badge></TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
