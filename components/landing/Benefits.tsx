import { Calendar, ShieldCheck, Heart, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function Benefits() {
    const benefits = [
        {
            icon: Calendar,
            title: "Agenda 24/7",
            description: "Reserva tu hora cuando quieras, sin llamadas ni esperas."
        },
        {
            icon: ShieldCheck,
            title: "Doctores Certificados",
            description: "Profesionales especialistas con amplia experiencia clínica."
        },
        {
            icon: Zap,
            title: "Tecnología Avanzada",
            description: "Equipamiento de última generación para diagnósticos precisos."
        },
        {
            icon: Heart,
            title: "Facilidades de Pago",
            description: "Planes a tu medida y convenios con aseguradoras."
        }
    ];

    return (
        <section className="py-16 bg-slate-50 relative -mt-10 z-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {benefits.map((b, i) => (
                        <Card key={i} className="border-none shadow-lg hover:-translate-y-1 transition-transform duration-300">
                            <CardContent className="pt-6 flex flex-col items-center text-center">
                                <div className="mb-4 rounded-full bg-teal-100 p-3 text-teal-600">
                                    <b.icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{b.title}</h3>
                                <p className="text-sm text-slate-600">{b.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
