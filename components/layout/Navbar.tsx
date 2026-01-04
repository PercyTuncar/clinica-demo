"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Smile } from "lucide-react";
import { useUIStore } from "@/lib/stores/useUIStore";

export function Navbar() {
    const { openBooking } = useUIStore();
    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center space-x-2.5">
                        <div className="bg-teal-50 p-2 rounded-xl transition-colors group-hover:bg-teal-100">
                            <Smile className="h-7 w-7 text-teal-600" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900">
                            Clínica<span className="text-teal-600">Dental</span>
                        </span>
                    </Link>

                    {/* Centered Navigation */}
                    <div className="hidden md:flex items-center justify-center gap-10 text-sm font-medium text-slate-500">
                        <Link href="#servicios" className="hover:text-teal-600 transition-colors">Servicios</Link>
                        <Link href="#equipo" className="hover:text-teal-600 transition-colors">Equipo</Link>
                        <Link href="#testimonios" className="hover:text-teal-600 transition-colors">Testimonios</Link>
                        <Link href="#faq" className="hover:text-teal-600 transition-colors">Preguntas</Link>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center justify-end gap-4">
                        <Link href="/login" className="hidden sm:block">
                            <Button variant="ghost" className="text-slate-500 hover:text-teal-700 hover:bg-teal-50">
                                Acceso Staff
                            </Button>
                        </Link>
                        <Button
                            onClick={() => openBooking()}
                            className="bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/20 rounded-full px-6 transition-all hover:scale-105"
                        >
                            Agendar Cita
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
