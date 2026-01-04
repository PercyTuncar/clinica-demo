"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Calendar, Users, LogOut, DollarSign } from "lucide-react";
import { useAuthStore } from "@/lib/stores/useAuthStore";
import { useRouter } from "next/navigation";

export function ReceptionSidebar() {
    const pathname = usePathname();
    const { logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    const links = [
        { href: "/reception", label: "Dashboard", icon: LayoutDashboard },
        { href: "/reception/appointments", label: "Citas", icon: Calendar },
        { href: "/reception/patients", label: "Pacientes", icon: Users },
        { href: "/reception/payments", label: "Caja", icon: DollarSign },
    ];

    return (
        <div className="flex h-screen w-64 flex-col border-r bg-slate-900 text-white">
            <div className="flex h-16 items-center px-6">
                <span className="text-xl font-bold text-teal-400">Recepción</span>
            </div>

            <nav className="flex-1 space-y-1 px-4 py-4">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-slate-800",
                                isActive ? "bg-teal-600 text-white hover:bg-teal-700" : "text-slate-400"
                            )}
                        >
                            <link.icon className="h-5 w-5" />
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-400 hover:bg-slate-800 hover:text-red-300 transition-colors"
                >
                    <LogOut className="h-5 w-5" />
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
}
