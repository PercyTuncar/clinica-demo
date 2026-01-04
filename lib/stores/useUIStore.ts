import { create } from 'zustand';

interface UIState {
    isBookingOpen: boolean;
    preselectedServiceId: string | null;
    openBooking: (serviceId?: string | null) => void;
    closeBooking: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    isBookingOpen: false,
    preselectedServiceId: null,
    openBooking: (serviceId = null) => set({ isBookingOpen: true, preselectedServiceId: serviceId }),
    closeBooking: () => set({ isBookingOpen: false, preselectedServiceId: null }),
}));
