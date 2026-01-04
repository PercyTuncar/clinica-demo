"use client";

import { useServiceStore } from "@/lib/stores/useServiceStore";
import { cn } from "@/lib/utils";
import { Clock, Tag, Sparkles, ArrowRight } from "lucide-react";

interface Step1ServiceProps {
    selectedServiceId: string | null;
    onSelect: (serviceId: string) => void;
}

export function Step1Service({ selectedServiceId, onSelect }: Step1ServiceProps) {
    const { services } = useServiceStore();
    const activeServices = services.filter(s => s.active);

    return (
        <div className="grid gap-4 sm:grid-cols-2">
            {activeServices.map((service) => {
                const isSelected = selectedServiceId === service.id;

                return (
                    <div
                        key={service.id}
                        onClick={() => onSelect(service.id)}
                        className={cn(
                            "group cursor-pointer rounded-2xl border-2 p-5 transition-all duration-300 hover:shadow-lg relative overflow-hidden",
                            isSelected
                                ? "border-teal-600 bg-teal-50 shadow-md"
                                : "border-slate-100 bg-white hover:border-teal-200"
                        )}
                    >
                        {/* Discount Badge */}
                        {service.discount && (
                            <div className="absolute top-0 right-0 rounded-bl-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
                                {service.discount.percentage}% OFF
                            </div>
                        )}

                        <div className="flex items-start gap-4">
                            <div className={cn(
                                "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                                isSelected ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-teal-100 group-hover:text-teal-600"
                            )}>
                                <Sparkles className="h-6 w-6" />
                            </div>

                            <div className="flex-1 space-y-1">
                                <h4 className={cn("font-bold text-lg transition-colors", isSelected ? "text-teal-900" : "text-slate-900")}>
                                    {service.name}
                                </h4>
                                <div className="flex items-center gap-3 text-sm text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3.5 w-3.5" />
                                        {service.duration} min
                                    </span>
                                </div>
                                <div className="pt-2 flex items-center justify-between">
                                    <span className="text-xl font-bold text-slate-900 group-hover:scale-105 transition-transform origin-left">
                                        ${service.price.toLocaleString('es-CL')}
                                    </span>

                                    <div className={cn(
                                        "h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300",
                                        isSelected ? "bg-teal-600 text-white opacity-100" : "bg-slate-100 text-slate-400 opacity-0 group-hover:opacity-100"
                                    )}>
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
