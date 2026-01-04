"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash, Calendar, Save } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Session {
    id: number;
    description: string;
    duration: number; // minutes
    cost: number;
}

export function TreatmentPlanBuilder() {
    const [sessions, setSessions] = useState<Session[]>([
        { id: 1, description: "", duration: 30, cost: 0 }
    ]);
    const [planName, setPlanName] = useState("");

    const addSession = () => {
        setSessions([...sessions, {
            id: sessions.length + 1,
            description: "",
            duration: 30,
            cost: 0
        }]);
    };

    const removeSession = (id: number) => {
        setSessions(sessions.filter(s => s.id !== id));
    };

    const updateSession = (id: number, field: keyof Session, value: string | number) => {
        setSessions(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const totalCost = sessions.reduce((acc, s) => acc + Number(s.cost), 0);

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label>Nombre del Plan</Label>
                <Input
                    placeholder="Ej: Endodoncia Molar 16"
                    value={planName}
                    onChange={(e) => setPlanName(e.target.value)}
                />
            </div>

            <div className="space-y-4">
                <Label>Sesiones Programadas</Label>
                {sessions.map((session, index) => (
                    <Card key={session.id} className="bg-slate-50 border-slate-200">
                        <CardContent className="p-4 grid gap-4 grid-cols-1 md:grid-cols-12 items-end">
                            <div className="md:col-span-1 font-bold text-slate-500 text-center pb-2">
                                #{index + 1}
                            </div>

                            <div className="md:col-span-6 space-y-1">
                                <Label className="text-xs">Procedimiento</Label>
                                <Input
                                    placeholder="Descripción de la sesión..."
                                    value={session.description}
                                    onChange={(e) => updateSession(session.id, 'description', e.target.value)}
                                />
                            </div>

                            <div className="md:col-span-2 space-y-1">
                                <Label className="text-xs">Duración (min)</Label>
                                <Input
                                    type="number"
                                    value={session.duration}
                                    onChange={(e) => updateSession(session.id, 'duration', Number(e.target.value))}
                                />
                            </div>

                            <div className="md:col-span-2 space-y-1">
                                <Label className="text-xs">Costo ($)</Label>
                                <Input
                                    type="number"
                                    value={session.cost}
                                    onChange={(e) => updateSession(session.id, 'cost', Number(e.target.value))}
                                />
                            </div>

                            <div className="md:col-span-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-red-400 hover:text-red-600 hover:bg-red-50"
                                    onClick={() => removeSession(session.id)}
                                    disabled={sessions.length === 1}
                                >
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Button onClick={addSession} variant="outline" className="w-full border-dashed border-2">
                <Plus className="mr-2 h-4 w-4" /> Agregar Sesión
            </Button>

            <div className="flex justify-between items-center bg-teal-50 p-4 rounded-lg border border-teal-100">
                <div>
                    <p className="text-sm text-teal-600 font-medium">Costo Total Estimado</p>
                    <p className="text-2xl font-bold text-teal-800">${totalCost.toLocaleString('es-CL')}</p>
                    <p className="text-xs text-teal-500">Sesiones: {sessions.length}</p>
                </div>
                <Button className="bg-teal-600 hover:bg-teal-700">
                    <Save className="mr-2 h-4 w-4" /> Guardar Plan
                </Button>
            </div>
        </div>
    );
}
