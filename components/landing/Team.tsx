"use client";

import { useDoctorStore } from "@/lib/stores/useDoctorStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Award, Stethoscope } from "lucide-react";

export function Team() {
    const { doctors } = useDoctorStore();
    const activeDoctors = doctors.filter(d => d.active);

    return (
        <section id="equipo" className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[500px] bg-teal-50/50 skew-y-3 transform -z-10" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800 mb-4">
                        <Award className="mr-1 h-3.5 w-3.5" />
                        Especialistas Certificados
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Conoce a los expertos
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto font-light">
                        Nuestro equipo multidisciplinario combina años de experiencia con pasión por la odontología estética y restauradora.
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {activeDoctors.map((doctor) => (
                        <Card key={doctor.id} className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
                            <div className="relative pt-10 pb-6 bg-gradient-to-br from-slate-100 to-white flex flex-col items-center">
                                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur rounded-full px-2 py-1 shadow-sm flex items-center gap-1 text-xs font-bold text-amber-500">
                                    <Star className="h-3 w-3 fill-amber-500" />
                                    {doctor.rating}
                                </div>
                                <Avatar className="h-32 w-32 border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-300">
                                    <AvatarImage src={doctor.avatar} alt={doctor.name} className="object-cover" />
                                    <AvatarFallback className="bg-teal-100 text-teal-800 text-2xl">{doctor.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="mt-4 text-center px-4">
                                    <h3 className="text-lg font-bold text-slate-900 leading-tight">{doctor.name}</h3>
                                    <p className="text-teal-600 font-medium text-sm mt-1">{doctor.specialty}</p>
                                </div>
                            </div>

                            <CardContent className="pt-4 pb-6 px-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-sm text-slate-500 border-t border-slate-100 pt-4">
                                        <div className="flex items-center gap-1.5">
                                            <Stethoscope className="h-4 w-4 text-teal-500" />
                                            <span>{doctor.yearsOfExperience} años exp.</span>
                                        </div>
                                    </div>

                                    <div className="text-xs text-slate-400 text-center">
                                        Especialista en casos complejos
                                    </div>

                                    <Button variant="outline" className="w-full border-teal-200 text-teal-700 hover:bg-teal-600 hover:text-white transition-colors text-sm h-10">
                                        Solicitar Cita
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
