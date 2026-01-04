"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, FileText, Fingerprint } from "lucide-react";

const patientSchema = z.object({
    firstName: z.string().trim().regex(/^[a-zA-Z\u00C0-\u00FF]+\s+[a-zA-Z\u00C0-\u00FF]+(\s+[a-zA-Z\u00C0-\u00FF]+)*$/, "Ingresa tu nombre completo (Nombre + Apellido)"),
    rut: z.string().regex(/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/, "RUT Inválido (Ej: 12.345.678-9)"),
    email: z.string().email("Email inválido"),
    phone: z.string().min(9, "Mínimo 9 dígitos"),
    isFirstVisit: z.enum(["yes", "no"]),
    notes: z.string().max(500).optional()
});

export type PatientFormData = z.infer<typeof patientSchema>;

interface Step4PatientProps {
    onSubmit: (data: PatientFormData) => void;
    defaultValues?: Partial<PatientFormData> | null;
}

export function Step4Patient({ onSubmit, defaultValues }: Step4PatientProps) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PatientFormData>({
        resolver: zodResolver(patientSchema),
        defaultValues: defaultValues || {
            isFirstVisit: "yes"
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Personal Info Group */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider mb-4">Información Personal</h3>

                <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <Input id="firstName" {...register("firstName")} placeholder="Nombre Completo" className="pl-10 h-12 bg-slate-50 border-slate-200 focus-visible:ring-teal-500" />
                    {errors.firstName && <span className="text-red-500 text-xs ml-1 mt-1 block">{errors.firstName.message}</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <Fingerprint className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                        <Input id="rut" {...register("rut")} placeholder="RUT (12.345.678-9)" className="pl-10 h-12 bg-slate-50 border-slate-200 focus-visible:ring-teal-500" />
                        {errors.rut && <span className="text-red-500 text-xs ml-1 mt-1 block">{errors.rut.message}</span>}
                    </div>
                    <div className="relative">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                        <Input id="phone" {...register("phone")} placeholder="Teléfono (+56 9...)" className="pl-10 h-12 bg-slate-50 border-slate-200 focus-visible:ring-teal-500" />
                        {errors.phone && <span className="text-red-500 text-xs ml-1 mt-1 block">{errors.phone.message}</span>}
                    </div>
                </div>

                <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <Input id="email" type="email" {...register("email")} placeholder="Correo Electrónico" className="pl-10 h-12 bg-slate-50 border-slate-200 focus-visible:ring-teal-500" />
                    {errors.email && <span className="text-red-500 text-xs ml-1 mt-1 block">{errors.email.message}</span>}
                </div>
            </div>

            {/* Clinical Info Group */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider mb-4">Información Clínica</h3>

                <div className="space-y-3">
                    <Label className="text-slate-700">¿Es tu primera visita a la clínica?</Label>
                    <RadioGroup defaultValue="yes" className="flex gap-4">
                        <div className="flex items-center space-x-2 border rounded-xl p-3 flex-1 hover:bg-slate-50 cursor-pointer transition-colors has-[:checked]:border-teal-500 has-[:checked]:bg-teal-50">
                            <RadioGroupItem value="yes" id="r1" className="text-teal-600" />
                            <Label htmlFor="r1" className="cursor-pointer flex-1 font-medium">Sí, soy nuevo</Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-xl p-3 flex-1 hover:bg-slate-50 cursor-pointer transition-colors has-[:checked]:border-teal-500 has-[:checked]:bg-teal-50">
                            <RadioGroupItem value="no" id="r2" className="text-teal-600" />
                            <Label htmlFor="r2" className="cursor-pointer flex-1 font-medium">No, ya tengo ficha</Label>
                        </div>
                    </RadioGroup>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="notes" className="text-slate-700">¿Algún motivo específico o molestia? (Opcional)</Label>
                    <div className="relative">
                        <FileText className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                        <Textarea id="notes" {...register("notes")} placeholder="Ej: Tengo sensibilidad en un diente..." className="pl-10 min-h-[100px] bg-slate-50 border-slate-200 focus-visible:ring-teal-500 resize-none" />
                    </div>
                </div>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full bg-teal-600 hover:bg-teal-700 text-white h-14 text-lg shadow-lg shadow-teal-600/20 rounded-xl mt-4">
                {isSubmitting ? "Confirmando..." : "Confirmar Reserva"}
            </Button>
        </form>
    );
}
