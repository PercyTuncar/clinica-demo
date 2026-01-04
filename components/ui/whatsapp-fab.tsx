import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function WhatsAppFAB() {
    return (
        <Link
            href="https://wa.me/56973018634?text=Hola,%20quisiera%20agendar%20una%20cita"
            target="_blank"
            className="fixed bottom-6 right-6 z-50 animate-bounce hover:animate-none"
        >
            <Button
                size="icon"
                className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-xl shadow-green-500/30"
            >
                <MessageCircle className="h-8 w-8" />
                <span className="sr-only">Contactar por WhatsApp</span>
            </Button>
        </Link>
    );
}
