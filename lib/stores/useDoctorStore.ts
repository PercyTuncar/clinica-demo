import { create } from 'zustand';
import { Doctor } from '@/lib/types';

interface DoctorState {
    doctors: Doctor[];
    getDoctorById: (id: string) => Doctor | undefined;
    getDoctorsByService: (serviceId: string) => Doctor[]; // Logic will need service mapping
    updateDoctor: (id: string, data: Partial<Doctor>) => void;
}

const INITIAL_DOCTORS: Doctor[] = [
    {
        id: 'DOC-001',
        name: 'Dra. Sofia Martínez',
        email: 'dra.sofia.martinez@clinicadental.com',
        role: 'doctor',
        specialty: 'Ortodoncia',
        title: 'Dra.',
        licenseNumber: 'ORT-1001',
        yearsOfExperience: 10,
        rating: 4.9,
        totalPatients: 1250,
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop&q=80',
        servicesOffered: ['SVC-002', 'SVC-006', 'SVC-007'], // Ortodoncia related
        active: true,
        color: '#EC4899', // Pink
        blockedDates: [],
        workingHours: {
            monday: { start: '09:00', end: '18:00', break: '13:00-14:00' },
            tuesday: { start: '09:00', end: '18:00', break: '13:00-14:00' },
            wednesday: { start: '09:00', end: '18:00', break: '13:00-14:00' },
            thursday: { start: '09:00', end: '18:00', break: '13:00-14:00' },
            friday: { start: '09:00', end: '18:00', break: '13:00-14:00' },
            saturday: null,
            sunday: null
        }
    },
    {
        id: 'DOC-002',
        name: 'Dr. Alejandro Torres',
        email: 'dr.alejandro.torres@clinicadental.com',
        role: 'doctor',
        specialty: 'Endodoncia',
        title: 'Dr.',
        licenseNumber: 'END-2002',
        yearsOfExperience: 8,
        rating: 4.7,
        totalPatients: 890,
        avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&auto=format&fit=crop&q=80',
        servicesOffered: ['SVC-005', 'SVC-001', 'SVC-007'], // Endodoncia + basic
        active: true,
        color: '#3B82F6', // Blue
        blockedDates: [],
        workingHours: {
            monday: { start: '08:00', end: '17:00', break: '13:00-14:00' },
            tuesday: { start: '08:00', end: '17:00', break: '13:00-14:00' },
            wednesday: { start: '08:00', end: '17:00', break: '13:00-14:00' },
            thursday: { start: '08:00', end: '17:00', break: '13:00-14:00' },
            friday: { start: '08:00', end: '17:00', break: '13:00-14:00' },
            saturday: { start: '09:00', end: '14:00', break: '11:00-11:15' },
            sunday: null
        }
    },
    {
        id: 'DOC-003',
        name: 'Dra. Valentina López',
        email: 'dra.valentina.lopez@clinicadental.com',
        role: 'doctor',
        specialty: 'Implantología',
        title: 'Dra.',
        licenseNumber: 'IMP-3003',
        yearsOfExperience: 12,
        rating: 5.0,
        totalPatients: 640,
        avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&auto=format&fit=crop&q=80',
        servicesOffered: ['SVC-004', 'SVC-008'], // Implantes, Protesis
        active: true,
        color: '#8B5CF6', // Purple
        blockedDates: [],
        workingHours: {
            monday: null,
            tuesday: { start: '10:00', end: '19:00', break: '14:00-15:00' },
            wednesday: { start: '10:00', end: '19:00', break: '14:00-15:00' },
            thursday: { start: '10:00', end: '19:00', break: '14:00-15:00' },
            friday: { start: '10:00', end: '19:00', break: '14:00-15:00' },
            saturday: { start: '10:00', end: '19:00', break: '14:00-15:00' },
            sunday: null
        }
    },
    {
        id: 'DOC-004',
        name: 'Dr. Diego Fernández',
        email: 'dr.diego.fernandez@clinicadental.com',
        role: 'doctor',
        specialty: 'Odontología General',
        title: 'Dr.',
        licenseNumber: 'GEN-4004',
        yearsOfExperience: 5,
        rating: 4.8,
        totalPatients: 1560,
        avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&auto=format&fit=crop&q=80',
        servicesOffered: ['SVC-001', 'SVC-003', 'SVC-007'], // Limpieza, Blanqueamiento, Extraccion
        active: true,
        color: '#10B981', // Emerald
        blockedDates: ['2026-01-20', '2026-01-21'],
        workingHours: {
            monday: { start: '08:00', end: '20:00', break: '13:00-14:00' },
            tuesday: { start: '08:00', end: '20:00', break: '13:00-14:00' },
            wednesday: { start: '08:00', end: '20:00', break: '13:00-14:00' },
            thursday: { start: '08:00', end: '20:00', break: '13:00-14:00' },
            friday: { start: '08:00', end: '20:00', break: '13:00-14:00' },
            saturday: null,
            sunday: null
        }
    }
];

export const useDoctorStore = create<DoctorState>((set, get) => ({
    doctors: INITIAL_DOCTORS,
    getDoctorById: (id) => get().doctors.find(d => d.id === id),
    getDoctorsByService: (serviceId) => get().doctors.filter(d => d.servicesOffered.includes(serviceId)),
    updateDoctor: (id, data) => set(state => ({
        doctors: state.doctors.map(d => d.id === id ? { ...d, ...data } : d)
    }))
}));
