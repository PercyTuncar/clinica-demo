import { Hero } from "@/components/landing/Hero";
import { ServicesList } from "@/components/landing/ServicesList";
import { Team } from "@/components/landing/Team";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 pb-10">
      <Hero />
      <div id="servicios">
        <ServicesList />
      </div>
      <div id="equipo">
        <Team />
      </div>
      <div id="testimonios">
        <Testimonials />
      </div>
      <div id="faq">
        <FAQ />
      </div>
    </div>
  );
}
