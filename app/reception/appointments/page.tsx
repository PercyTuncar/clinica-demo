"use client";

import { useState } from "react";
import { useAppointmentStore } from "@/lib/stores/useAppointmentStore";
import { useDoctorStore } from "@/lib/stores/useDoctorStore";
import { usePatientStore } from "@/lib/stores/usePatientStore";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export default function AppointmentsPage() {
    const { appointments, updateStatus } = useAppointmentStore();
    const { doctors } = useDoctorStore();
    const { patients } = usePatientStore();

    const [filterDoc, setFilterDoc] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    const filtered = appointments.filter(appt => {
        const patient = patients.find(p => p.id === appt.patientId);
        const patientName = patient ? `${patient.firstName} ${patient.lastName}`.toLowerCase() : "";

        const matchesDoc = filterDoc === "all" || appt.doctorId === filterDoc;
        const matchesStatus = filterStatus === "all" || appt.status === filterStatus;
        const matchesSearch = patientName.includes(searchTerm.toLowerCase()) || appt.id.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesDoc && matchesStatus && matchesSearch;
    }).sort((a, b) => new Date(b.date + 'T' + b.time).getTime() - new Date(a.date + 'T' + a.time).getTime());

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200';
            case 'pending': return 'bg-amber-100 text-amber-700 hover:bg-amber-200';
            case 'cancelled': return 'bg-red-100 text-red-700 hover:bg-red-200';
            case 'completed': return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Gestión de Citas</h1>
            </div>

            <div className="flex gap-4 p-4 bg-white rounded-lg shadow-sm">
                <div className="flex-1">
                    <Input
                        placeholder="Buscar por paciente o código..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select value={filterDoc} onValueChange={setFilterDoc}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Doctor" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos los doctores</SelectItem>
                        {doctors.map(d => (
                            <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos los estados</SelectItem>
                        <SelectItem value="pending">Pendiente</SelectItem>
                        <SelectItem value="confirmed">Confirmada</SelectItem>
                        <SelectItem value="completed">Completada</SelectItem>
                        <SelectItem value="cancelled">Cancelada</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Fecha / Hora</TableHead>
                            <TableHead>Paciente</TableHead>
                            <TableHead>Doctor</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-slate-500">No se encontraron citas</TableCell>
                            </TableRow>
                        ) : (
                            filtered.map(appt => {
                                const doctor = doctors.find(d => d.id === appt.doctorId);
                                const patient = patients.find(p => p.id === appt.patientId);

                                return (
                                    <TableRow key={appt.id}>
                                        <TableCell>
                                            <div className="font-medium">{format(parseISO(appt.date), 'dd MMM yyyy', { locale: es })}</div>
                                            <div className="text-xs text-slate-500">{appt.time} ({appt.duration} min)</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-medium">{patient ? `${patient.firstName} ${patient.lastName}` : 'Invitado'}</div>
                                            <div className="text-xs text-slate-500">{patient?.rut || 'Sin RUT'}</div>
                                        </TableCell>
                                        <TableCell>{doctor?.name}</TableCell>
                                        <TableCell>
                                            <Badge className={getStatusColor(appt.status)} variant="secondary">
                                                {appt.status.toUpperCase()}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            {appt.status === 'pending' && (
                                                <>
                                                    <Button size="sm" variant="outline" className="text-emerald-600" onClick={() => updateStatus(appt.id, 'confirmed', 'recep')}>Confirmar</Button>
                                                    <Button size="sm" variant="outline" className="text-red-600" onClick={() => updateStatus(appt.id, 'cancelled', 'recep')}>Cancelar</Button>
                                                </>
                                            )}
                                            {appt.status === 'confirmed' && (
                                                <Button size="sm" onClick={() => updateStatus(appt.id, 'completed', 'recep')}>Check-in</Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
