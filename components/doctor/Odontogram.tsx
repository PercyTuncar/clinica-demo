"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ToothProps {
    id: number;
    notes?: string;
    status: 'healthy' | 'decay' | 'filled' | 'missing';
    onClick: (id: number) => void;
}

function Tooth({ id, status, onClick }: ToothProps) {
    const color = {
        healthy: "fill-white hover:fill-slate-100",
        decay: "fill-red-400 hover:fill-red-500",
        filled: "fill-blue-400 hover:fill-blue-500",
        missing: "fill-slate-200 opacity-50"
    }[status];

    return (
        <div
            onClick={() => onClick(id)}
            className="flex flex-col items-center gap-1 cursor-pointer transition-transform hover:scale-110"
        >
            <svg width="40" height="50" viewBox="0 0 40 50" className="drop-shadow-sm">
                {/* Simplified Molar Shape */}
                <path
                    d="M5,15 Q5,5 20,5 Q35,5 35,15 L35,35 Q35,45 20,45 Q5,45 5,35 Z"
                    className={cn("stroke-slate-400 stroke-2", color)}
                />
                {/* Root Lines */}
                <path d="M12,45 L12,35 M28,45 L28,35" className="stroke-slate-300 stroke-1" />
            </svg>
            <span className="text-xs font-mono text-slate-500">{id}</span>
        </div>
    );
}

export function Odontogram() {
    // 1-16 Upper, 17-32 Lower (Universal System)
    const upperTeeth = Array.from({ length: 16 }, (_, i) => i + 1);
    const lowerTeeth = Array.from({ length: 16 }, (_, i) => 32 - i);

    const [toothStatus, setToothStatus] = useState<Record<number, 'healthy' | 'decay' | 'filled' | 'missing'>>({
        1: 'missing',
        16: 'decay', // Molar with issue mentioned in PRD
        30: 'filled'
    });

    const cycleStatus = (id: number) => {
        const statuses: ('healthy' | 'decay' | 'filled' | 'missing')[] = ['healthy', 'decay', 'filled', 'missing'];
        setToothStatus(prev => {
            const current = prev[id] || 'healthy';
            const next = statuses[(statuses.indexOf(current) + 1) % statuses.length];
            return { ...prev, [id]: next };
        });
    };

    return (
        <div className="p-4 border rounded-xl bg-white select-none">
            <h3 className="font-bold text-slate-700 mb-4 text-center">Odontograma Interactivo</h3>
            <p className="text-xs text-center text-slate-400 mb-8">Haz clic en una pieza para cambiar su estado</p>

            {/* Upper Arch */}
            <div className="flex justify-center gap-2 mb-8 flex-wrap">
                {upperTeeth.map(id => (
                    <Tooth
                        key={id}
                        id={id}
                        status={toothStatus[id] || 'healthy'}
                        onClick={cycleStatus}
                    />
                ))}
            </div>

            {/* In-Between Separator */}
            <div className="border-t border-dashed border-slate-300 my-4 w-full h-1" />

            {/* Lower Arch */}
            <div className="flex justify-center gap-2 flex-wrap">
                {lowerTeeth.map(id => (
                    <Tooth
                        key={id}
                        id={id}
                        status={toothStatus[id] || 'healthy'}
                        onClick={cycleStatus}
                    />
                ))}
            </div>

            <div className="flex justify-center gap-6 mt-8 text-xs">
                <div className="flex items-center gap-2"><div className="w-3 h-3 border bg-white rounded-full"></div> Sano</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-400 rounded-full"></div> Caries</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-400 rounded-full"></div> Obturado</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-200 rounded-full"></div> Ausente</div>
            </div>
        </div>
    );
}
