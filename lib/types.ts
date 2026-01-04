export type Role = 'admin' | 'doctor' | 'reception' | 'patient';

export interface User {
    id: string;
    email: string;
    name: string;
    role: Role;
    avatar?: string;
    specialty?: string; // For doctors
}

export interface Doctor extends User {
    specialty: string;
    title: string;
    licenseNumber: string;
    yearsOfExperience: number;
    rating: number;
    totalPatients: number;
    workingHours: WorkingHours;
    blockedDates: string[]; // ISO Date strings
    servicesOffered: string[]; // Service IDs
    active: boolean;
    color: string; // For calendar visualization
}

export interface WorkingHours {
    monday: DaySchedule | null;
    tuesday: DaySchedule | null;
    wednesday: DaySchedule | null;
    thursday: DaySchedule | null;
    friday: DaySchedule | null;
    saturday: DaySchedule | null;
    sunday: DaySchedule | null;
    [key: string]: DaySchedule | null;
}

export interface DaySchedule {
    start: string; // "09:00"
    end: string;   // "18:00"
    break: string; // "13:00-14:00"
}

export interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number; // minutes
    category: string;
    active: boolean;
    requiredDoctor: string[]; // Doctor IDs
    discount?: {
        type: 'first-visit' | 'seasonal';
        percentage: number;
    };
}

export interface Patient {
    id: string;
    rut: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string; // ISO Date
    address: string;
    comments?: string;
    firstVisit: string; // ISO Date
    status: 'active' | 'inactive';
    emergencyContact?: {
        name: string;
        phone: string;
    };
    medicalAlerts: string[];
    notes: string[];
    totalSpent: number;
    outstandingBalance: number;
}

export type AppointmentStatus =
    | 'pending'
    | 'confirmed'
    | 'checked-in'
    | 'in-progress'
    | 'completed'
    | 'cancelled'
    | 'no-show'
    | 'paid'
    | 'waitlist';

export interface Appointment {
    id: string;
    serviceId: string;
    doctorId: string;
    patientId: string;
    date: string; // ISO Date "YYYY-MM-DD"
    time: string; // "HH:MM"
    duration: number;
    status: AppointmentStatus;
    createdAt: string;
    source: 'web' | 'phone' | 'walk-in';
    notes?: string;
    price: number;
    paid: boolean;
    paymentMethod?: 'cash' | 'credit-card' | 'debit-card' | 'transfer';
    cancelReason?: string;
    statusHistory: {
        status: AppointmentStatus;
        timestamp: string;
        by: string; // User ID
    }[];
}

export interface Transaction {
    id: string;
    type: 'income' | 'expense' | 'refund';
    appointmentId?: string;
    patientId?: string;
    amount: number;
    method: 'cash' | 'credit-card' | 'debit-card' | 'transfer';
    date: string;
    processedBy: string;
    invoiceNumber?: string;
    status: 'pending' | 'completed' | 'refunded';
    description?: string;
}

export interface InventoryItem {
    id: string;
    name: string;
    sku: string;
    category: 'insumo' | 'instrumental' | 'farmaco';
    quantity: number;
    unit: string;
    minThreshold: number;
    lastRestock: string;
}
