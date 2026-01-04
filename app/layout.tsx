import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { WhatsAppFAB } from "@/components/ui/whatsapp-fab"; // Check path

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clínica Dental - Tu Sonrisa, Nuestra Pasión",
  description: "Agenda tu cita en minutos con nuestros especialistas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <BookingWizard />
        <WhatsAppFAB />
      </body>
    </html>
  );
}
