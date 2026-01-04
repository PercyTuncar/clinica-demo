"use client";

import { useState } from "react";
import { useFinanceStore } from "@/lib/stores/useFinanceStore";
import { usePatientStore } from "@/lib/stores/usePatientStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, DollarSign, FileText } from "lucide-react";
import { format, parseISO } from "date-fns";

export default function PaymentsPage() {
    const { transactions, registerTransaction } = useFinanceStore();
    const { patients } = usePatientStore();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Form State
    const [selectedPatientId, setSelectedPatientId] = useState("");
    const [amount, setAmount] = useState("");
    const [method, setMethod] = useState("cash");
    const [type, setType] = useState("income");
    const [description, setDescription] = useState("");

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        registerTransaction({
            id: `TRX-${Date.now()}`,
            type: type as 'income' | 'expense',
            amount: Number(amount),
            method: method as 'cash' | 'credit-card' | 'debit-card' | 'transfer',
            date: new Date().toISOString(),
            patientId: selectedPatientId || undefined,
            description: description,
            status: 'completed',
            processedBy: 'recep-1',
            invoiceNumber: `FACT-${Date.now()}` // Mock invoice
        });
        setIsDialogOpen(false);
        // Reset
        setAmount("");
        setDescription("");
    };

    const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Caja y Pagos</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                            <Plus className="mr-2 h-4 w-4" /> Registrar Transacción
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Nueva Transacción</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleRegister} className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Tipo</Label>
                                <Select value={type} onValueChange={setType}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="income">Ingreso (Pago Paciente)</SelectItem>
                                        <SelectItem value="expense">Egreso (Gasto)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {type === 'income' && (
                                <div className="space-y-2">
                                    <Label>Paciente</Label>
                                    <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar Paciente" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {patients.map(p => (
                                                <SelectItem key={p.id} value={p.id}>{p.firstName} {p.lastName}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label>Monto</Label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                                    <Input
                                        type="number"
                                        className="pl-9"
                                        placeholder="0"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Método de Pago</Label>
                                <Select value={method} onValueChange={setMethod}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="cash">Efectivo</SelectItem>
                                        <SelectItem value="debit-card">Débito</SelectItem>
                                        <SelectItem value="credit-card">Crédito</SelectItem>
                                        <SelectItem value="transfer">Transferencia</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Descripción / Notas</Label>
                                <Input
                                    placeholder="Ej: Abono tratamiento ortodoncia"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">Registrar</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {/* Mock Summary Cards */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Ingresos Hoy</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$150.000</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Egresos Hoy</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">$0</div>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Descripción</TableHead>
                            <TableHead>Método</TableHead>
                            <TableHead className="text-right">Monto</TableHead>
                            <TableHead className="text-right">Recibo</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedTransactions.map(trx => {
                            const patient = patients.find(p => p.id === trx.patientId);

                            return (
                                <TableRow key={trx.id}>
                                    <TableCell className="font-medium">
                                        {format(parseISO(trx.date), 'dd/MM/yyyy HH:mm')}
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{trx.type === 'income' ? 'Ingreso' : 'Egreso'}</div>
                                        <div className="text-sm text-slate-500">
                                            {trx.patientId ? `Paciente: ${patient?.firstName} ${patient?.lastName}` : trx.description}
                                        </div>
                                    </TableCell>
                                    <TableCell className="capitalize">{trx.method}</TableCell>
                                    <TableCell className={`text-right font-bold ${trx.type === 'income' ? 'text-emerald-600' : 'text-red-600'}`}>
                                        {trx.type === 'income' ? '+' : '-'}${trx.amount.toLocaleString('es-CL')}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {trx.invoiceNumber && (
                                            <Button variant="ghost" size="sm">
                                                <FileText className="h-4 w-4 text-slate-400" />
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
