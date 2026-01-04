"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQS = [
    {
        q: "¿Cómo cancelo mi cita?",
        a: "Puedes cancelar tu cita desde el enlace en tu correo de confirmación o llamándonos directamente. Recuerda que cancelaciones con menos de 12 horas tienen recargo."
    },
    {
        q: "¿Aceptan seguros?",
        a: "Sí, trabajamos con las principales Isapres y seguros dentales complementarios. Emitimos boleta reembolsable para que puedas gestionar tu reembolso fácilmente."
    },
    {
        q: "¿Qué pasa si llego tarde?",
        a: "Damos una tolerancia de 10 minutos. Después de ese tiempo, la cita puede ser acortada o reprogramada para no afectar al siguiente paciente y mantener nuestros estándares de puntualidad."
    },
    {
        q: "¿Tienen estacionamiento?",
        a: "Sí, contamos con estacionamiento subterráneo gratuito para pacientes por 2 horas. El acceso es por calle lateral, presentando tu ticket en recepción."
    },
    {
        q: "¿Atienden urgencias?",
        a: "Sí, tenemos cupos reservados diariamente para urgencias dentales. Llámanos inmediatamente si tienes una emergencia y haremos lo posible por atenderte el mismo día."
    },
    {
        q: "¿Ofrecen financiamiento?",
        a: "Ofrecemos pago en 3 cuotas sin interés con tarjeta de crédito, y hasta 6 cuotas para tratamientos de ortodoncia e implantes."
    },
    {
        q: "¿Cómo accedo a mi historial?",
        a: "Puedes solicitar una copia de tu ficha clínica en recepción o próximamente a través de nuestro nuevo portal de pacientes en línea."
    },
    {
        q: "¿Qué medidas de bioseguridad tienen?",
        a: "Seguimos estrictos protocolos de esterilización hospitalaria y desinfección UV entre cada paciente, superando los estándares exigidos por el Minsal."
    }
];

export function FAQ() {
    return (
        <section id="faq" className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-teal-50 rounded-full mb-4">
                        <HelpCircle className="h-6 w-6 text-teal-600" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Preguntas Frecuentes
                    </h2>
                    <p className="mt-4 text-lg text-slate-500 font-light">
                        Resolvemos tus dudas para que vengas tranquilo
                    </p>
                </div>

                <div className="grid gap-6">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {FAQS.map((faq, i) => (
                            <AccordionItem key={i} value={`item-${i}`} className="border border-slate-200 rounded-xl px-6 bg-slate-50/50 data-[state=open]:bg-white data-[state=open]:shadow-md transition-all duration-200">
                                <AccordionTrigger className="text-left text-slate-900 font-semibold hover:text-teal-600 py-6 text-lg">
                                    {faq.q}
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-600 pb-6 leading-relaxed">
                                    {faq.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
