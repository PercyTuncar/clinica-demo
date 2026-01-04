import Link from "next/link";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
    return (
        <footer className="bg-slate-950 text-slate-200 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-900/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 py-16 relative z-10 transition-all duration-1000 ease-in-out">
                <div className="grid gap-12 lg:grid-cols-4 border-b border-slate-800 pb-12 mb-12">
                    <div className="lg:col-span-1 space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-teal-500 rounded-lg flex items-center justify-center">
                                <span className="font-bold text-white text-xl">CD</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white tracking-tight">Clínica Dental</h3>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed font-light">
                            Transformamos vidas a través de sonrisas saludables. Tecnología de vanguardia y atención humana en un solo lugar.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <Link href="#" className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:bg-slate-800 transition-all group">
                                <Facebook className="h-5 w-5 group-hover:scale-110 transition-transform" />
                            </Link>
                            <Link href="#" className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:bg-slate-800 transition-all group">
                                <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform" />
                            </Link>
                            <Link href="#" className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:bg-slate-800 transition-all group">
                                <Twitter className="h-5 w-5 group-hover:scale-110 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6 text-lg ml-11">Navegación</h4>
                        <ul className="space-y-4 text-sm ml-11">
                            <li><Link href="/" className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-2 group"><ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-5" /> Inicio</Link></li>
                            <li><Link href="#servicios" className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-2 group"><ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-5" /> Servicios</Link></li>
                            <li><Link href="#equipo" className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-2 group"><ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-5" /> Doctores</Link></li>
                            <li><Link href="#testimonios" className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-2 group"><ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-5" /> Testimonios</Link></li>
                            <li><Link href="/login" className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-2 group"><ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-5" /> Intranet</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6 text-lg">Contáctanos</h4>
                        <ul className="space-y-5 text-sm">
                            <li className="flex items-start gap-4 group cursor-pointer">
                                <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center shrink-0 group-hover:bg-teal-500/10 transition-colors">
                                    <MapPin className="h-4 w-4 text-teal-500" />
                                </div>
                                <span className="text-slate-400 group-hover:text-slate-300 transition-colors">Av. Providencia 1234, Of. 505<br />Santiago, Chile</span>
                            </li>
                            <li className="flex items-center gap-4 group cursor-pointer">
                                <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center shrink-0 group-hover:bg-teal-500/10 transition-colors">
                                    <Phone className="h-4 w-4 text-teal-500" />
                                </div>
                                <span className="text-slate-400 group-hover:text-slate-300 transition-colors">+56 9 8765 4321</span>
                            </li>
                            <li className="flex items-center gap-4 group cursor-pointer">
                                <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center shrink-0 group-hover:bg-teal-500/10 transition-colors">
                                    <Mail className="h-4 w-4 text-teal-500" />
                                </div>
                                <span className="text-slate-400 group-hover:text-slate-300 transition-colors">contacto@clinicadental.com</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6 text-lg">Horario de Atención</h4>
                        <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800 space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-400">Lun - Vie</span>
                                <span className="text-white font-medium">8:00 - 20:00</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-400">Sábados</span>
                                <span className="text-white font-medium">9:00 - 14:00</span>
                            </div>
                            <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-800/50">
                                <span className="text-slate-400">Domingos</span>
                                <span className="text-red-400 font-medium">Cerrado</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-600 pt-4">
                    <div className="flex flex-col md:flex-row items-center gap-2">
                        <p>© 2026 Clínica Dental. Todos los derechos reservados.</p>
                        <span className="hidden md:inline text-slate-800">|</span>
                        <p>Creado por <span className="font-bold text-slate-500">PERCY TUNCAR</span></p>
                    </div>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-slate-400 transition-colors">Términos</Link>
                        <Link href="#" className="hover:text-slate-400 transition-colors">Privacidad</Link>
                        <Link href="#" className="hover:text-slate-400 transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
