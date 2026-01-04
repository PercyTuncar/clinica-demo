"use client";

import { useServiceStore } from "@/lib/stores/useServiceStore";
import { Button } from "@/components/ui/button";
import { Clock, Tag, ArrowRight, CheckCircle2, Stethoscope, Smile, Drill, Syringe, HeartPulse, Sparkles, Activity, ShieldCheck } from "lucide-react";
import { useUIStore } from "@/lib/stores/useUIStore";
import { cn } from "@/lib/utils";

const ServiceIcon = ({ category }: { category: string }) => {
    switch (category) {
        case 'Preventiva': return <ShieldCheck className="h-7 w-7 text-teal-600" />;
        case 'Ortodoncia': return <Smile className="h-7 w-7 text-teal-600" />;
        case 'Estética': return <Sparkles className="h-7 w-7 text-teal-600" />;
        case 'Implantología': return <Drill className="h-7 w-7 text-teal-600" />;
        case 'Endodoncia': return <Activity className="h-7 w-7 text-teal-600" />;
        case 'Cirugía': return <Syringe className="h-7 w-7 text-teal-600" />;
        default: return <HeartPulse className="h-7 w-7 text-teal-600" />;
    }
};

export function ServicesList() {
    const { services } = useServiceStore();
    const { openBooking } = useUIStore();
    const activeServices = services.filter(s => s.active);

    return (
        <section id="servicios" className="py-24 bg-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-50 rounded-full blur-3xl opacity-50" />
            <div className="absolute top-40 -left-20 w-72 h-72 bg-indigo-50 rounded-full blur-3xl opacity-50" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-sm font-semibold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <Sparkles className="h-4 w-4" />
                        <span>Tratamientos Premium</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
                        Excelencia en cada detalle
                    </h2>
                    <p className="text-xl text-slate-500 font-light leading-relaxed">
                        Tecnología de vanguardia y especialistas dedicados para brindarte la mejor experiencia dental de tu vida.
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {activeServices.map((service, index) => (
                        <div
                            key={service.id}
                            className="group relative bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Hover Gradient Border */}
                            <div className="absolute inset-0 rounded-3xl ring-2 ring-transparent group-hover:ring-teal-500/20 transition-all duration-300 pointer-events-none" />

                            {/* Discount Badge */}
                            {service.discount && (
                                <div className="absolute -top-3 -right-3 z-20">
                                    <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 animate-bounce">
                                        <Tag className="h-3 w-3" />
                                        {service.discount.percentage}% OFF
                                    </div>
                                </div>
                            )}

                            {/* Icon & Title */}
                            <div className="mb-6">
                                <div className="h-14 w-14 rounded-2xl bg-teal-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <ServiceIcon category={service.category} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">
                                    {service.name}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                                    {service.description}
                                </p>
                            </div>

                            {/* Features / Details */}
                            <div className="mt-auto space-y-6">
                                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <Clock className="h-4 w-4 text-teal-500" />
                                        <span>{service.duration} min</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <CheckCircle2 className="h-4 w-4 text-teal-500" />
                                        <span>Garantizado</span>
                                    </div>
                                </div>

                                {/* Price & Action */}
                                <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between group-hover:bg-teal-50/50 transition-colors">
                                    <div>
                                        <p className="text-xs text-slate-400 font-semibold uppercase">Desde</p>
                                        <p className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                                            ${service.price.toLocaleString('es-CL')}
                                        </p>
                                    </div>
                                    <Button
                                        onClick={() => openBooking(service.id)}
                                        size="icon"
                                        className="h-10 w-10 rounded-full bg-white text-teal-600 shadow-sm border border-slate-200 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all duration-300 group-hover:scale-110"
                                    >
                                        <ArrowRight className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
