"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Mail } from "lucide-react";
import FinancialTab from "@/app/admin/reports/components/FinancialTab";
import PatientReportsTab from "@/app/admin/reports/components/PatientReportsTab";
import OperationalTab from "@/app/admin/reports/components/OperationalTab";

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Reportes Avanzados</h1>
                    <p className="text-slate-500">Análisis detallado de finanzas, pacientes y operatividad.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Exportar Excel</Button>
                    <Button><Mail className="mr-2 h-4 w-4" /> Enviar PDF</Button>
                </div>
            </div>

            <Tabs defaultValue="financial" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="financial">Financiero</TabsTrigger>
                    <TabsTrigger value="patients">Pacientes</TabsTrigger>
                    <TabsTrigger value="operational">Operativo</TabsTrigger>
                </TabsList>

                <TabsContent value="financial" className="space-y-4">
                    <FinancialTab />
                </TabsContent>

                <TabsContent value="patients" className="space-y-4">
                    <PatientReportsTab />
                </TabsContent>

                <TabsContent value="operational" className="space-y-4">
                    <OperationalTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}
