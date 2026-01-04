"use client";

import { useState } from "react";
import { useDoctorStore } from "@/lib/stores/useDoctorStore";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Search, Edit } from "lucide-react";

export default function StaffPage() {
    const { doctors, updateDoctor } = useDoctorStore();
    const [searchTerm, setSearchTerm] = useState("");

    const filtered = doctors.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleToggleActive = (id: string, current: boolean) => {
        updateDoctor(id, { active: !current });
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ name: "", email: "", specialty: "", role: "doctor" });

    const handleSave = () => {
        if (editingId) {
            updateDoctor(editingId, { name: formData.name, email: formData.email, specialty: formData.specialty });
        } else {
            // Mock Create Logic
            console.log("Creating new doctor", formData);
        }
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ name: "", email: "", specialty: "", role: "doctor" });
    };

    const openEdit = (doc: any) => {
        setEditingId(doc.id);
        setFormData({ name: doc.name, email: doc.email, specialty: doc.specialty, role: doc.role });
        setIsModalOpen(true);
    };

    const openNew = () => {
        setEditingId(null);
        setFormData({ name: "", email: "", specialty: "", role: "doctor" });
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Gestión de Personal Médico</h1>
                <Button onClick={openNew}>
                    <Plus className="mr-2 h-4 w-4" /> Nuevo Doctor
                </Button>
            </div>

            <div className="flex items-center gap-2 p-4 bg-white rounded-lg shadow-sm">
                <Search className="h-5 w-5 text-slate-400" />
                <Input
                    className="border-none shadow-none focus-visible:ring-0"
                    placeholder="Buscar doctor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingId ? "Editar Doctor" : "Nuevo Doctor"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Nombre Completo</Label>
                            <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label>Especialidad</Label>
                            <Input value={formData.specialty} onChange={e => setFormData({ ...formData, specialty: e.target.value })} />
                        </div>
                        <Button className="w-full bg-teal-600 hover:bg-teal-700" onClick={handleSave}>Guardar</Button>
                    </div>
                </DialogContent>
            </Dialog>

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Especialidad</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map(doc => (
                            <TableRow key={doc.id}>
                                <TableCell>
                                    <div className="font-medium">{doc.name}</div>
                                    <div className="text-xs text-slate-500">{doc.email}</div>
                                </TableCell>
                                <TableCell>{doc.specialty}</TableCell>
                                <TableCell>{doc.rating} ★</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${doc.active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                        {doc.active ? 'Activo' : 'Inactivo'}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right flex justify-end gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => handleToggleActive(doc.id, doc.active)}>
                                        {doc.active ? 'Desactivar' : 'Activar'}
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => openEdit(doc)}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
