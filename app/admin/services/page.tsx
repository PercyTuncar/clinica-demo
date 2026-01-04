"use client";

import { useState } from "react";
import { useServiceStore } from "@/lib/stores/useServiceStore";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

export default function ServicesPage() {
    const { services } = useServiceStore();

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mock for now, would use store Actions in real implementation
    const handleSave = () => setIsModalOpen(false);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Catálogo de Servicios</h1>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Nuevo Servicio
                </Button>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Nuevo Servicio</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Nombre del Servicio</Label>
                            <Input placeholder="Ej: Limpieza Profunda" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Precio ($)</Label>
                                <Input type="number" placeholder="45000" />
                            </div>
                            <div className="space-y-2">
                                <Label>Duración (min)</Label>
                                <Input type="number" placeholder="30" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Categoría</Label>
                            <Input placeholder="General, Estética, etc." />
                        </div>
                        <Button className="w-full bg-teal-600 hover:bg-teal-700" onClick={handleSave}>Guardar Servicio</Button>
                    </div>
                </DialogContent>
            </Dialog>

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Servicio</TableHead>
                            <TableHead>Categoría</TableHead>
                            <TableHead>Duración</TableHead>
                            <TableHead>Precio</TableHead>
                            <TableHead>Estado</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {services.map(svc => (
                            <TableRow key={svc.id}>
                                <TableCell>
                                    <div className="font-medium">{svc.name}</div>
                                    <div className="text-xs text-slate-500">{svc.description}</div>
                                </TableCell>
                                <TableCell>{svc.category}</TableCell>
                                <TableCell>{svc.duration} min</TableCell>
                                <TableCell>${svc.price.toLocaleString('es-CL')}</TableCell>
                                <TableCell>
                                    {svc.active ? <Badge className="bg-emerald-500">Activo</Badge> : <Badge variant="destructive">Inactivo</Badge>}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
