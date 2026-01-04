"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppointmentStore } from "@/lib/stores/useAppointmentStore";
import { usePatientStore } from "@/lib/stores/usePatientStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Clock, Save, FileText, Printer, CheckCircle, AlertTriangle } from "lucide-react";
import { Odontogram } from "@/components/doctor/Odontogram";
import { TreatmentPlanBuilder } from "@/components/doctor/TreatmentPlanBuilder";

export default function ConsultationPage() {
    const { id } = useParams();
    const router = useRouter();
    const { appointments, updateStatus } = useAppointmentStore();
    const { getPatientById } = usePatientStore();

    const appointment = appointments.find(a => a.id === id);
    const patient = appointment ? getPatientById(appointment.patientId) : null;

    // Timer State
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    // Clinical Data State
    const [anamnesis, setAnamnesis] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [treatment, setTreatment] = useState("");
    const [prescription, setPrescription] = useState("");

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(s => s + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    const formatTime = (secs: number) => {
        const mins = Math.floor(secs / 60);
        const s = secs % 60;
        return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    if (!appointment) return <div className="p-8">Cita no encontrada</div>;

    const handleFinish = () => {
        if (confirm("¿Finalizar la consulta y cerrar ficha?")) {
            updateStatus(appointment.id, 'completed', 'doc-1'); // Mock user ID
            alert("Consulta finalizada exitosamente.");
            router.push("/doctor");
        }
    };

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            {/* Header: Patient Info & Timer */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        {patient ? `${patient.firstName} ${patient.lastName}` : 'Paciente Invitado'}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                        <span>RUT: {patient?.rut || 'N/A'}</span>
                        <span>Edad: 30 años (Mock)</span>
                        <span className="flex items-center gap-1 text-amber-600">
                            <AlertTriangle className="h-4 w-4" /> Alergia: Penicilina
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xl font-bold ${isActive ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-slate-100 text-slate-600'}`}>
                        <Clock className="h-5 w-5" />
                        {formatTime(seconds)}
                    </div>
                    <Button
                        variant={isActive ? "destructive" : "default"}
                        onClick={() => setIsActive(!isActive)}
                    >
                        {isActive ? "Pausar" : "Iniciar Timer"}
                    </Button>
                    <Button
                        className="bg-emerald-600 hover:bg-emerald-700"
                        onClick={handleFinish}
                    >
                        <CheckCircle className="mr-2 h-4 w-4" /> Finalizar Consulta
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Clinical History (Mock) */}
                <Card className="lg:col-span-1 h-fit">
                    <CardHeader>
                        <CardTitle className="text-lg">Historial Clínico</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                        <div className="border-l-2 border-slate-200 pl-3 pb-4">
                            <p className="font-bold text-slate-900">10 Dic 2025</p>
                            <p className="text-slate-500">Evaluación Inicial - Dr. Pérez</p>
                            <p className="italic mt-1">"Paciente reporta dolor leve en zona molar..."</p>
                        </div>
                        <div className="border-l-2 border-slate-200 pl-3 pb-4">
                            <p className="font-bold text-slate-900">05 Nov 2025</p>
                            <p className="text-slate-500">Limpieza - Dra. Soto</p>
                            <p className="italic mt-1">"Profilaxis realizada sin complicaciones."</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Right: Working Area */}
                <Card className="lg:col-span-2">
                    <CardContent className="p-6">
                        <Tabs defaultValue="anamnesis" className="w-full">
                            <TabsList className="grid w-full grid-cols-4 mb-6">
                                <TabsTrigger value="anamnesis">Anamnesis</TabsTrigger>
                                <TabsTrigger value="diagnosis">Diagnóstico</TabsTrigger>
                                <TabsTrigger value="treatment">Plan</TabsTrigger>
                                <TabsTrigger value="prescription">Receta</TabsTrigger>
                            </TabsList>

                            <TabsContent value="anamnesis" className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Motivo de Consulta</Label>
                                    <Input defaultValue={appointment.notes} readOnly className="bg-slate-50" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Evolución / Notas Clínicas</Label>
                                    <Textarea
                                        className="min-h-[100px]"
                                        placeholder="Escriba aquí los detalles de la consulta..."
                                        value={anamnesis}
                                        onChange={e => setAnamnesis(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Odontograma (Interactivo)</Label>
                                    <Odontogram />
                                </div>
                            </TabsContent>

                            <TabsContent value="diagnosis" className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Diagnóstico Principal (CIE-10 Mock)</Label>
                                    <Input placeholder="Buscar diagnóstico..." />
                                </div>
                                <div className="space-y-2">
                                    <Label>Observaciones</Label>
                                    <Textarea
                                        className="min-h-[200px]"
                                        placeholder="Detalles del diagnóstico..."
                                        value={diagnosis}
                                        onChange={e => setDiagnosis(e.target.value)}
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent value="treatment" className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Procedimientos Realizados</Label>
                                    <div className="p-4 border rounded-lg bg-slate-50">
                                        <p className="font-medium">Limpieza Dental Profunda</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Plan de Tratamiento Futuro</Label>
                                    <TreatmentPlanBuilder />
                                </div>

                            </TabsContent>

                            <TabsContent value="prescription" className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Indicaciones / Medicamentos</Label>
                                    <Textarea
                                        className="min-h-[200px] font-mono"
                                        placeholder="Ej: Ibuprofeno 400mg cada 8 horas por 3 días..."
                                        value={prescription}
                                        onChange={e => setPrescription(e.target.value)}
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <Button variant="outline" onClick={() => window.print()}>
                                        <Printer className="mr-2 h-4 w-4" /> Imprimir Receta
                                    </Button>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div >
    );
}
