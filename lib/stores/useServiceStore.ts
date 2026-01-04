import { create } from 'zustand';
import { Service } from '@/lib/types';

interface ServiceState {
    services: Service[];
    getServiceById: (id: string) => Service | undefined;
}

const INITIAL_SERVICES: Service[] = [
    {
        id: 'SVC-001',
        name: 'Limpieza Dental Profunda',
        description: 'Remoción de sarro y placa bacteriana (Destartraje y Profilaxis)',
        price: 45000,
        duration: 45,
        category: 'Preventiva',
        active: true,
        requiredDoctor: ['DOC-002', 'DOC-004'], // General and Endo can do cleaning
        discount: { type: 'first-visit', percentage: 20 }
    },
    {
        id: 'SVC-002',
        name: 'Evaluación Ortodoncia',
        description: 'Diagnóstico inicial para frenillos o alineadores',
        price: 30000,
        duration: 30,
        category: 'Ortodoncia',
        active: true,
        requiredDoctor: ['DOC-001'] // Sofia only
    },
    {
        id: 'SVC-003',
        name: 'Blanqueamiento Dental',
        description: 'Blanqueamiento clínico led y cubetas',
        price: 120000,
        duration: 60,
        category: 'Estética',
        active: true,
        requiredDoctor: ['DOC-004'] // Diego
    },
    {
        id: 'SVC-004',
        name: 'Implante Dental (Evaluación)',
        description: 'Evaluación para reemplazo de piezas perdidas',
        price: 50000, // "Consultar" in PRD, typical evaluation price
        duration: 90,
        category: 'Implantología',
        active: true,
        requiredDoctor: ['DOC-003'] // Valentina
    },
    {
        id: 'SVC-005',
        name: 'Endodoncia Unirradicular',
        description: 'Tratamiento de conducto para dientes de una raíz',
        price: 150000,
        duration: 60,
        category: 'Endodoncia',
        active: true,
        requiredDoctor: ['DOC-002'] // Alejandro
    },
    {
        id: 'SVC-006',
        name: 'Diseño de Sonrisa',
        description: 'Planificación digital estética',
        price: 80000, // Evaluation price
        duration: 90,
        category: 'Estética',
        active: true,
        requiredDoctor: ['DOC-001']
    },
    {
        id: 'SVC-007',
        name: 'Extracción Simple',
        description: 'Exodoncia de pieza simple no retenida',
        price: 40000,
        duration: 30,
        category: 'Cirugía',
        active: true,
        requiredDoctor: ['DOC-001', 'DOC-002', 'DOC-003', 'DOC-004'] // All
    },
    {
        id: 'SVC-008',
        name: 'Prótesis Removible',
        description: 'Evaluación y toma de medidas',
        price: 40000,
        duration: 45,
        category: 'Rehabilitación',
        active: true,
        requiredDoctor: ['DOC-003']
    }
];

export const useServiceStore = create<ServiceState>((set, get) => ({
    services: INITIAL_SERVICES,
    getServiceById: (id) => get().services.find(s => s.id === id)
}));
