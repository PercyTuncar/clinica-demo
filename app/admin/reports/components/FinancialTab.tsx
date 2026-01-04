"use client";

import { useFinanceStore } from "@/lib/stores/useFinanceStore";
import { useServiceStore } from "@/lib/stores/useServiceStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

export default function FinancialTab() {
    const { transactions } = useFinanceStore();
    const { services } = useServiceStore();

    // 1. Income by Service (Mock logic for demo)
    const incomeByServiceData = services.map(service => {
        // In a real app we'd filter transactions by service ID
        const value = transactions.length > 0 ? (service.price * Math.floor(Math.random() * 20)) : 0;
        return { name: service.name, value };
    }).filter(s => s.value > 0).slice(0, 5);

    // 2. Payment Methods
    const methods = ['cash', 'credit-card', 'debit-card', 'transfer'];
    const paymentMethodsData = methods.map(method => ({
        name: method === 'credit-card' ? 'Crédito' : method === 'debit-card' ? 'Débito' : method === 'cash' ? 'Efectivo' : 'Transf.',
        value: transactions.filter(t => t.method === method).length || Math.floor(Math.random() * 10), // Mock if empty
        color: method === 'cash' ? '#10b981' : method === 'credit-card' ? '#f59e0b' : method === 'debit-card' ? '#3b82f6' : '#6366f1'
    }));

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Ingresos por Servicio</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={incomeByServiceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" fontSize={12} />
                                <YAxis />
                                <Tooltip formatter={(value) => `$${Number(value).toLocaleString('es-CL')}`} />
                                <Bar dataKey="value" fill="#0d9488" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Métodos de Pago Utilizados</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={paymentMethodsData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {paymentMethodsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
