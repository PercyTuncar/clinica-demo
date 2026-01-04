"use client";
import { Button } from "@/components/ui/button";
import { Calendar, ShieldCheck, Activity, Star } from "lucide-react";
import { useUIStore } from "@/lib/stores/useUIStore";

export function Hero() {
    const { openBooking } = useUIStore();

    return (
        <section className="relative h-[calc(100vh-5rem)] min-h-[600px] overflow-hidden bg-slate-50 flex items-center">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[50%] h-full bg-teal-50/50 rounded-l-[100px] -z-10 hidden lg:block" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full">
                <div className="grid lg:grid-cols-2 gap-12 h-full items-center">

                    {/* Left Content */}
                    <div className="space-y-8 py-10">
                        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse"></span>
                            <span className="text-sm font-semibold text-slate-600">Aceptamos nuevos pacientes</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                            Cuidamos tu <br />
                            <span className="text-teal-600 relative">
                                sonrisa
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-teal-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                                </svg>
                            </span>
                        </h1>

                        <p className="text-xl text-slate-500 max-w-lg leading-relaxed font-light">
                            Tecnología dental avanzada y un equipo humano cálido.
                            Tu salud bucal en las mejores manos, sin dolor y con resultados garantizados.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <Button
                                onClick={() => openBooking()}
                                className="bg-teal-600 hover:bg-teal-700 text-white h-14 px-8 rounded-full text-lg shadow-xl shadow-teal-600/20 transition-all hover:scale-105"
                            >
                                <Calendar className="mr-2 h-5 w-5" />
                                Agendar Cita
                            </Button>
                            <Button
                                variant="outline"
                                className="h-14 px-8 rounded-full text-lg border-2 border-slate-200 text-slate-600 hover:border-teal-600 hover:text-teal-600 bg-transparent"
                            >
                                Ver Tratamientos
                            </Button>
                        </div>

                        <div className="flex gap-8 pt-8 border-t border-slate-200 lg:border-teal-100/50 w-full max-w-md">
                            <div>
                                <p className="text-3xl font-bold text-slate-900">+15k</p>
                                <p className="text-sm text-slate-500">Pacientes</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-slate-900">15+</p>
                                <p className="text-sm text-slate-500">Expertos</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-slate-900">4.9</p>
                                <div className="flex text-amber-400 text-sm items-center">
                                    <Star className="h-3 w-3 fill-current" />
                                    <span className="ml-1 text-slate-500">Rating</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative h-full hidden lg:flex items-center justify-center">
                        <div className="relative w-full max-w-[500px] aspect-[4/5]">
                            <div className="absolute inset-0 bg-teal-200 rounded-[3rem] rotate-6 opacity-20 transform translate-x-4 translate-y-4"></div>
                            <img
                                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80"
                                alt="Dental Care"
                                className="relative w-full h-full object-cover rounded-[3rem] shadow-2xl z-10"
                            />

                            {/* Floating Card */}
                            <div className="absolute bottom-10 -left-10 bg-white p-5 rounded-2xl shadow-xl z-20 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                    <ShieldCheck className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900">Garantía Clínica</p>
                                    <p className="text-xs text-slate-500">Certificada por expertos</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
