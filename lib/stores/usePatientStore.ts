import { create } from 'zustand';

import { Patient } from '@/lib/types';

interface PatientState {
    patients: Patient[];
    addPatient: (patient: Patient) => void;
    updatePatient: (id: string, data: Partial<Patient>) => void;
    getPatientById: (id: string) => Patient | undefined;
    getPatientByRut: (rut: string) => Patient | undefined;
}

const INITIAL_PATIENTS: Patient[] = [
    {
        id: 'PAT-123',
        rut: '18.765.432-1',
        firstName: 'María',
        lastName: 'González',
        email: 'maria.gonzalez@email.com',
        phone: '+56987654321',
        dateOfBirth: '1994-03-15',
        address: 'Av. Providencia 1234, Santiago',
        firstVisit: '2026-01-07',
        status: 'active',
        emergencyContact: {
            name: 'Pedro González',
            phone: '+56912345678'
        },
        medicalAlerts: ['Alergia a penicilina'],
        notes: ['Paciente con sensibilidad dental'],
        totalSpent: 45000,
        outstandingBalance: 0,
        comments: 'Llega tarde habitualmente'
    },
    {
        id: 'PAT-124',
        rut: '12.345.678-9',
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan.perez@email.com',
        phone: '+56987654322',
        dateOfBirth: '1985-05-20',
        address: 'Calle Falsa 123',
        firstVisit: '2025-12-10',
        status: 'active',
        medicalAlerts: [],
        notes: [],
        totalSpent: 120000,
        outstandingBalance: 30000
    },
    {
        id: 'PAT-125',
        rut: '9.876.543-2',
        firstName: 'Ana',
        lastName: 'López',
        email: 'ana.lopez@email.com',
        phone: '+56987654323',
        dateOfBirth: '1990-11-05',
        address: 'Alameda 456',
        firstVisit: '2026-01-02',
        status: 'inactive',
        medicalAlerts: ['Hipertensión'],
        notes: ['Requiere sedación'],
        totalSpent: 0,
        outstandingBalance: 0
    }
];

export const usePatientStore = create<PatientState>()((set, get) => ({
    patients: INITIAL_PATIENTS,
    addPatient: (patient) => set((state) => ({ patients: [...state.patients, patient] })),
    updatePatient: (id, data) => set((state) => ({
        patients: state.patients.map((p) => p.id === id ? { ...p, ...data } : p)
    })),
    getPatientById: (id) => get().patients.find((p) => p.id === id),
    getPatientByRut: (rut) => get().patients.find((p) => p.rut === rut),
}));
