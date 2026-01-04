"use client";

import { useFinanceStore } from "@/lib/stores/useFinanceStore";
import { useAppointmentStore } from "@/lib/stores/useAppointmentStore";
import { useDoctorStore } from "@/lib/stores/useDoctorStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, TrendingUp, Users, Calendar } from "lucide-react";

export default function AdminDashboard() {
    const { transactions } = useFinanceStore();
    const { appointments } = useAppointmentStore();
    const { doctors } = useDoctorStore();

    // Mock calculations for KPIs
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const profit = totalIncome - totalExpense;

    // Chart Data: Income by Month (Mock + Real)
    // Group transactions by month
    const incomeByMonth = [
        { name: 'Oct', income: 4500000 },
        { name: 'Nov', income: 5200000 },
        { name: 'Dic', income: 6100000 },
        { name: 'Ene', income: totalIncome } // Accumulate current month
    ];

    // Appointments by Status
    const statusData = [
        { name: 'Completadas', value: appointments.filter(a => a.status === 'completed').length, color: '#059669' },
        { name: 'Canceladas', value: appointments.filter(a => a.status === 'cancelled').length, color: '#ef4444' },
        { name: 'Pendientes', value: appointments.filter(a => a.status === 'pending').length, color: '#f59e0b' },
    ];

    // Income by Doctor
    const doctorPerformance = doctors.map(doc => {
        // Find completed appointments for this doctor
        const docAppts = appointments.filter(a => a.doctorId === doc.id && a.status === 'completed');
        const income = docAppts.reduce((sum, a) => sum + a.price, 0); // Approx
        return {
            name: doc.name.split(' ')[1], // Last name
            income
        };
    }).filter(d => d.income > 0);

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-slate-900">Panel Ejecutivo</h1>

            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Ingresos Totales</CardTitle>
                        <DollarSign className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">${totalIncome.toLocaleString('es-CL')}</div>
                        <p className="text-xs text-emerald-600 font-bold flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" /> +12% vs mes anterior
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Beneficio Neto</CardTitle>
                        <DollarSign className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">${profit.toLocaleString('es-CL')}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Citas Totales</CardTitle>
                        <Calendar className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">{appointments.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Doctores Activos</CardTitle>
                        <Users className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">{doctors.filter(d => d.active).length}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Ingresos Mensuales</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={incomeByMonth}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
                                    <Tooltip formatter={(value) => `$${Number(value).toLocaleString('es-CL')}`} />
                                    <Bar dataKey="income" fill="#0d9488" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Estado de Citas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={statusData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {statusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-center gap-4 text-xs text-slate-500">
                            {statusData.map((d, i) => (
                                <div key={i} className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                                    {d.name} ({d.value})
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
