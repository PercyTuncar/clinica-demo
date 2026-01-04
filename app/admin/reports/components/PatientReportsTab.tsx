"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Users, UserPlus, UserMinus, Activity } from "lucide-react";

export default function PatientReportsTab() {
    // Mock Data for "Reporte de Pacientes" as per PRD
    const data = [
        { name: 'Sep', nuevos: 12, recurrentes: 40 },
        { name: 'Oct', nuevos: 18, recurrentes: 45 },
        { name: 'Nov', nuevos: 15, recurrentes: 55 },
        { name: 'Dic', nuevos: 25, recurrentes: 70 },
        { name: 'Ene', nuevos: 30, recurrentes: 85 },
    ];

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Total Pacientes Activos</CardTitle>
                        <Users className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">342</div>
                        <p className="text-xs text-green-600 font-bold">+5% este mes</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Nuevos Pacientes</CardTitle>
                        <UserPlus className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">30</div>
                        <p className="text-xs text-slate-500">En Enero 2026</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Tasa de Retención</CardTitle>
                        <Activity className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">85%</div>
                        <p className="text-xs text-slate-500">Últimos 12 meses</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Pacientes Inactivos</CardTitle>
                        <UserMinus className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">12</div>
                        <p className="text-xs text-red-500">&gt; 6 meses sin cita</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Crecimiento de Pacientes (Nuevos vs Recurrentes)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorNuevos" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorRecurrentes" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" fontSize={12} />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Area type="monotone" dataKey="nuevos" stroke="#8884d8" fillOpacity={1} fill="url(#colorNuevos)" name="Nuevos" />
                                <Area type="monotone" dataKey="recurrentes" stroke="#82ca9d" fillOpacity={1} fill="url(#colorRecurrentes)" name="Recurrentes" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
