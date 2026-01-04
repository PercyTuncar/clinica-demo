import { DoctorSidebar } from "@/components/doctor/Sidebar";

export default function DoctorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <DoctorSidebar />
            <main className="flex-1 overflow-y-auto max-h-screen p-8">
                {children}
            </main>
        </div>
    );
}
