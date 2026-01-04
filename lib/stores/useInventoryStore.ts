import { create } from 'zustand';
import { InventoryItem } from '@/lib/types';

interface InventoryState {
    items: InventoryItem[];
    addItem: (item: InventoryItem) => void;
    updateStock: (id: string, quantity: number) => void;
    getLowStockItems: () => InventoryItem[];
}

const INITIAL_INVENTORY: InventoryItem[] = [
    {
        id: 'INV-001',
        name: 'Guantes de Nitrilo (Caja)',
        sku: 'GUA-MED-M',
        category: 'insumo',
        quantity: 45,
        unit: 'cajas',
        minThreshold: 10,
        lastRestock: '2026-01-02'
    },
    {
        id: 'INV-002',
        name: 'Anestesia Tópica',
        sku: 'ANES-TOP',
        category: 'farmaco',
        quantity: 12,
        unit: 'frascos',
        minThreshold: 5,
        lastRestock: '2025-12-28'
    },
    {
        id: 'INV-003',
        name: 'Kit de Espejos',
        sku: 'INST-ESP',
        category: 'instrumental',
        quantity: 20,
        unit: 'unidades',
        minThreshold: 20,
        lastRestock: '2025-11-15'
    }
];

export const useInventoryStore = create<InventoryState>((set, get) => ({
    items: INITIAL_INVENTORY,
    addItem: (item) => set((state) => ({ items: [...state.items, item] })),
    updateStock: (id, quantity) => set((state) => ({
        items: state.items.map(i => i.id === id ? { ...i, quantity } : i)
    })),
    getLowStockItems: () => get().items.filter(i => i.quantity <= i.minThreshold)
}));
