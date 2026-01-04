"use client";

import { useState } from "react";
import { useAuthStore } from "@/lib/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Smile, Loader2 } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuthStore();
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const success = await login(email, password);
            if (success) {
                // Get the updated user from store to check role
                const user = useAuthStore.getState().user;

                if (user?.role === 'reception') router.push("/reception");
                else if (user?.role === 'admin') router.push("/admin");
                else if (user?.role === 'doctor') router.push("/doctor");
                else router.push("/"); // Fallback
            } else {
                setError("Credenciales inválidas");
            }
        } catch (err) {
            setError("Ocurrió un error al intentar ingresar");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center">
                            <Smile className="h-8 w-8 text-teal-600" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl">Acceso Staff</CardTitle>
                    <CardDescription>
                        Ingresa tus credenciales para acceder al sistema
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="usuario@clinicadental.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <div className="text-red-500 text-sm text-center">{error}</div>}

                        <div className="text-xs text-slate-500 bg-slate-100 p-3 rounded mt-4">
                            <p className="font-bold mb-1">Credenciales Demo:</p>
                            <p>Recep: recepcion@clinicadental.com / Recep2024!</p>
                            <p>Doc: dra.sofia.martinez@clinicadental.com / Sofia2024!</p>
                            <p>Admin: admin@clinicadental.com / Admin2024!</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full bg-teal-600 hover:bg-teal-700" type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Ingresar
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
