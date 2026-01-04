import { create } from 'zustand';

import { User, Role } from '@/lib/types';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, pass: string) => Promise<boolean>;
    logout: () => void;
}

// Hardcoded users from PRD
const MOCK_USERS: (User & { password: string })[] = [
    // Receptionists
    {
        id: 'USR-001',
        name: 'María Gómez',
        email: 'recepcion@clinicadental.com',
        role: 'reception',
        password: 'Recep2024!',
        avatar: '/avatars/01.png'
    },
    {
        id: 'USR-002',
        name: 'Carlos Ruiz',
        email: 'carlos.ruiz@clinicadental.com',
        role: 'reception',
        password: 'Carlos2024!',
        avatar: '/avatars/02.png'
    },
    // Doctors
    {
        id: 'DOC-001',
        name: 'Dra. Sofia Martínez',
        email: 'dra.sofia.martinez@clinicadental.com',
        role: 'doctor',
        specialty: 'Ortodoncia',
        password: 'Sofia2024!',
        avatar: '/doctors/sofia.jpg'
    },
    {
        id: 'DOC-002',
        name: 'Dr. Alejandro Torres',
        email: 'dr.alejandro.torres@clinicadental.com',
        role: 'doctor',
        specialty: 'Endodoncia',
        password: 'Alejandro2024!',
        avatar: '/doctors/alejandro.jpg'
    },
    {
        id: 'DOC-003',
        name: 'Dra. Valentina López',
        email: 'dra.valentina.lopez@clinicadental.com',
        role: 'doctor',
        specialty: 'Implantología',
        password: 'Valentina2024!',
        avatar: '/doctors/valentina.jpg'
    },
    {
        id: 'DOC-004',
        name: 'Dr. Diego Fernández',
        email: 'dr.diego.fernandez@clinicadental.com',
        role: 'doctor',
        specialty: 'Odontología General',
        password: 'Diego2024!',
        avatar: '/doctors/diego.jpg'
    },
    // Admin
    {
        id: 'ADM-001',
        name: 'Admin General',
        email: 'admin@clinicadental.com',
        role: 'admin',
        password: 'Admin2024!',
        avatar: '/avatars/admin.png'
    },
    {
        id: 'ADM-002',
        name: 'Gerencia',
        email: 'gerencia@clinicadental.com',
        role: 'admin',
        password: 'Gerente2024!',
        avatar: '/avatars/manager.png'
    }
];

export const useAuthStore = create<AuthState>()((set) => ({
    user: null,
    isAuthenticated: false,
    login: async (email, password) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const cleanEmail = email.trim().toLowerCase();
        const cleanPassword = password.trim();

        const foundUser = MOCK_USERS.find(u =>
            u.email.toLowerCase() === cleanEmail &&
            u.password === cleanPassword
        );

        if (foundUser) {
            // Destructure password out so it's not in state
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password: _, ...userWithoutPass } = foundUser;
            set({ user: userWithoutPass, isAuthenticated: true });
            return true;
        }

        return false;
    },
    logout: () => set({ user: null, isAuthenticated: false }),
}));
