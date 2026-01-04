"use client";

import { useAuthStore } from "@/lib/stores/useAuthStore";
import { useAppointmentStore } from "@/lib/stores/useAppointmentStore";
import { usePatientStore } from "@/lib/stores/usePatientStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, User, FileText, Calendar } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";

export default function MyPatientsPage() {
    const { user } = useAuthStore();
    const { appointments } = useAppointmentStore();
    const { patients } = usePatientStore();
    const [searchTerm, setSearchTerm] = useState("");

    if (!user || user.role !== 'doctor') return <div>Acceso denegado</div>;

    // Logic: Find all unique patientIds from appointments where doctorId === user.id
    const myPatientIds = new Set(
        appointments
            .filter(a => a.doctorId === user.id)
            .map(a => a.patientId)
    );

    const myPatients = patients
        .filter(p => myPatientIds.has(p.id))
        .filter(p =>
            p.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.rut.includes(searchTerm)
        );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Mis Pacientes</h1>
                    <p className="text-slate-500">Gestión de historiales y seguimientos</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Buscar por nombre o RUT..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    {myPatients.length === 0 ? (
                        <div className="text-center py-8 text-slate-500">
                            {searchTerm ? "No se encontraron pacientes con esa búsqueda." : "Aún no has atendido pacientes."}
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {myPatients.map(patient => {
                                const lastAppt = appointments
                                    .filter(a => a.patientId === patient.id && a.doctorId === user.id)
                                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

                                return (
                                    <Link key={patient.id} href={`/doctor/consultation/${lastAppt?.id || '#'}`} className="block group">
                                        <Card className="h-full transition-transform hover:-translate-y-1 hover:shadow-md border-slate-200 group-hover:border-teal-500">
                                            <CardContent className="p-6">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-teal-100 group-hover:text-teal-600">
                                                        <User className="h-6 w-6" />
                                                    </div>
                                                    <Button variant="ghost" size="icon" className="text-slate-400 group-hover:text-teal-600">
                                                        <FileText className="h-5 w-5" />
                                                    </Button>
                                                </div>

                                                <h3 className="font-bold text-lg text-slate-900 group-hover:text-teal-700">
                                                    {patient.firstName} {patient.lastName}
                                                </h3>
                                                <p className="text-sm text-slate-500 mb-4">{patient.rut}</p>

                                                <div className="text-xs bg-slate-50 p-3 rounded-lg flex items-center gap-2 text-slate-600">
                                                    <Calendar className="h-3 w-3" />
                                                    Última visita: {lastAppt ? format(new Date(lastAppt.date), 'dd/MM/yyyy') : 'N/A'}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
