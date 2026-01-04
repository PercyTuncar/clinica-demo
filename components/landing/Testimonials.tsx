"use client";

import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const TESTIMONIALS = [
    {
        name: "Ana Morales",
        treatment: "Ortodoncia Invisible",
        rating: 5,
        comment: "Excelente atención de la Dra. Sofia. Mi sonrisa cambió por completo en menos tiempo del esperado. El proceso fue casi invisible.",
        avatar: "/avatars/ana.jpg"
    },
    {
        name: "Carlos Fuentes",
        treatment: "Implante Dental",
        rating: 5,
        comment: "Tenía mucho miedo al dentista, pero el Dr. Valentina fue muy paciente y profesional. No sentí dolor absoluto.",
        avatar: "/avatars/carlos.jpg"
    },
    {
        name: "Lucía Méndez",
        treatment: "Blanqueamiento LED",
        rating: 5,
        comment: "Resultados inmediatos desde la primera sesión. La clínica es hermosa, muy limpia y huelen increíble.",
        avatar: "/avatars/lucia.jpg"
    },
    {
        name: "Pedro Soto",
        treatment: "Limpieza Profunda",
        rating: 4,
        comment: "Muy puntuales y amables. Me explicaron todo el procedimiento antes de empezar y me sentí muy seguro.",
        avatar: "/avatars/pedro.jpg"
    }
];

export function Testimonials() {
    return (
        <section id="testimonios" className="py-24 bg-white relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Historias Reales
                        </h2>
                        <p className="mt-2 text-lg text-slate-500 font-light">
                            Pacientes que recuperaron su confianza con nosotros
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map(i => <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-slate-200 bg-[url('https://i.pravatar.cc/150?img=${i + 20}')] bg-cover`}></div>)}
                        </div>
                        <div className="text-sm font-semibold text-slate-900">
                            +500 resenas 5 estrellas
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {TESTIMONIALS.map((t, i) => (
                        <Card key={i} className="bg-slate-50 border-none shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
                            <CardContent className="pt-8 px-6 flex-grow">
                                <Quote className="h-8 w-8 text-teal-200 mb-4 fill-teal-100" />
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`h-4 w-4 ${i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                                    ))}
                                </div>
                                <p className="text-slate-700 mb-6 italic leading-relaxed text-sm">"{t.comment}"</p>
                            </CardContent>
                            <div className="px-6 pb-6 mt-auto">
                                <div className="flex items-center gap-3 border-t border-slate-200/60 pt-4">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={t.avatar} />
                                        <AvatarFallback className="bg-teal-600 text-white text-xs">{t.name.substring(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                                        <p className="text-teal-600 text-xs font-medium">{t.treatment}</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
