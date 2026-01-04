import { create } from 'zustand';

import { Transaction } from '@/lib/types';

interface FinanceState {
    transactions: Transaction[];
    registerTransaction: (transaction: Transaction) => void;
    getTransactionsByDate: (date: string) => Transaction[];
    getMonthlyReport: (month: number, year: number) => { income: number; expenses: number; count: number };
}

const MOCK_TRANSACTIONS: Transaction[] = [
    {
        id: 'TRX-001',
        type: 'income',
        appointmentId: 'APPT-COMP-001',
        patientId: 'PAT-124',
        amount: 45000,
        method: 'debit-card',
        date: '2025-12-15T14:45:00Z',
        processedBy: 'USR-001',
        status: 'completed',
        invoiceNumber: 'FACT-20251215-001'
    },
    {
        id: 'TRX-002',
        type: 'income',
        appointmentId: 'APPT-COMP-002',
        patientId: 'PAT-123',
        amount: 30000,
        method: 'cash',
        date: '2025-12-10T10:30:00Z',
        processedBy: 'USR-001',
        status: 'completed',
        invoiceNumber: 'FACT-20251210-001'
    },
    // Expense example
    {
        id: 'TRX-EXP-001',
        type: 'expense',
        amount: 150000,
        method: 'transfer',
        date: '2025-12-01T09:00:00Z',
        processedBy: 'ADM-001',
        status: 'completed',
        description: 'Compra insumos dentales'
    }
];

export const useFinanceStore = create<FinanceState>()((set, get) => ({
    transactions: MOCK_TRANSACTIONS,
    registerTransaction: (trx) => set((state) => ({ transactions: [...state.transactions, trx] })),
    getTransactionsByDate: (date) => {
        // Simple string match for YYYY-MM-DD
        return get().transactions.filter(t => t.date.startsWith(date));
    },
    getMonthlyReport: (month, year) => {
        const filtered = get().transactions.filter(t => {
            const d = new Date(t.date);
            return d.getMonth() === month && d.getFullYear() === year;
        });

        const income = filtered
            .filter(t => t.type === 'income' && t.status === 'completed')
            .reduce((sum, t) => sum + t.amount, 0);

        const expenses = filtered
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        return { income, expenses, count: filtered.filter(t => t.type === 'income').length };
    }
}));
