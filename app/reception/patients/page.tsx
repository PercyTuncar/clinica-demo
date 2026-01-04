"use client";

import { useState } from "react";
import { usePatientStore } from "@/lib/stores/usePatientStore";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Search } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const patientFormSchema = z.object({
    firstName: z.string().min(2, "Mínimo 2 caracteres"),
    lastName: z.string().min(2, "Mínimo 2 caracteres"),
    rut: z.string().regex(/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/, "RUT inválido"),
    email: z.string().email("Email inválido"),
    phone: z.string().min(8, "Teléfono inválido"),
});

type PatientFormValues = z.infer<typeof patientFormSchema>;

export default function PatientsPage() {
    const { patients, addPatient } = usePatientStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const filtered = patients.filter(p =>
        p.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.rut.includes(searchTerm)
    );

    const { register, handleSubmit, reset, formState: { errors } } = useForm<PatientFormValues>({
        resolver: zodResolver(patientFormSchema)
    });

    const onSubmit = (data: PatientFormValues) => {
        addPatient({
            id: `PAT-${Date.now()}`,
            ...data,
            dateOfBirth: '1990-01-01', // Mock default
            address: '',
            firstVisit: new Date().toISOString(),
            status: 'active',
            totalSpent: 0,
            outstandingBalance: 0,
            medicalAlerts: [],
            notes: []
        });
        setIsDialogOpen(false);
        reset();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Gestión de Pacientes</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-teal-600 hover:bg-teal-700">
                            <Plus className="mr-2 h-4 w-4" /> Nuevo Paciente
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Registrar Nuevo Paciente</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">Nombre</Label>
                                    <Input id="firstName" {...register("firstName")} />
                                    {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName.message}</span>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Apellido</Label>
                                    <Input id="lastName" {...register("lastName")} />
                                    {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName.message}</span>}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="rut">RUT</Label>
                                <Input id="rut" {...register("rut")} placeholder="12.345.678-9" />
                                {errors.rut && <span className="text-red-500 text-xs">{errors.rut.message}</span>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" {...register("email")} />
                                {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Teléfono</Label>
                                <Input id="phone" {...register("phone")} />
                                {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
                            </div>
                            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">Registrar</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex items-center gap-2 p-4 bg-white rounded-lg shadow-sm">
                <Search className="h-5 w-5 text-slate-400" />
                <Input
                    className="border-none shadow-none focus-visible:ring-0"
                    placeholder="Buscar por nombre o RUT..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>RUT</TableHead>
                            <TableHead>Contacto</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Deuda</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map(patient => (
                            <TableRow key={patient.id}>
                                <TableCell className="font-medium">{patient.firstName} {patient.lastName}</TableCell>
                                <TableCell>{patient.rut}</TableCell>
                                <TableCell>
                                    <div className="text-sm">{patient.email}</div>
                                    <div className="text-xs text-slate-500">{patient.phone}</div>
                                </TableCell>
                                <TableCell>
                                    <span className={patient.status === 'active' ? 'text-emerald-600' : 'text-red-600'}>
                                        {patient.status === 'active' ? 'Activo' : 'Inactivo'}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className={patient.outstandingBalance > 0 ? 'text-red-600 font-bold' : 'text-slate-600'}>
                                        ${patient.outstandingBalance.toLocaleString('es-CL')}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
