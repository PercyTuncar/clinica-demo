import { Hero } from "@/components/landing/Hero";
import { Benefits } from "@/components/landing/Benefits";
import { ServicesList } from "@/components/landing/ServicesList";
import { Team } from "@/components/landing/Team";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { WhatsAppFAB } from "@/components/ui/whatsapp-fab";

export default function LandingPage() {
    return (
        <>
            <Hero />
            <Benefits />
            <ServicesList />
            <Team />
            <Testimonials />
            <FAQ />
            <WhatsAppFAB />
        </>
    );
}
