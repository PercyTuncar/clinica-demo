"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Calendar, Users, LogOut, FileText } from "lucide-react";
import { useAuthStore } from "@/lib/stores/useAuthStore";
import { useRouter } from "next/navigation";

export function DoctorSidebar() {
    const pathname = usePathname();
    const { logout, user } = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    const links = [
        { href: "/doctor", label: "Mi Agenda", icon: Calendar },
        { href: "/doctor/patients", label: "Mis Pacientes", icon: Users },
    ];

    return (
        <div className="flex h-screen w-64 flex-col border-r bg-teal-900 text-white">
            <div className="flex flex-col h-20 justify-center px-6">
                <span className="text-lg font-bold text-teal-100">Portal Doctor</span>
                {user && <span className="text-xs text-teal-300 truncate">{user.name}</span>}
            </div>

            <nav className="flex-1 space-y-1 px-4 py-4">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-teal-800",
                                isActive ? "bg-teal-700 text-white shadow-sm" : "text-teal-100"
                            )}
                        >
                            <link.icon className="h-5 w-5" />
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-teal-800">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-300 hover:bg-teal-800 hover:text-red-200 transition-colors"
                >
                    <LogOut className="h-5 w-5" />
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
}
