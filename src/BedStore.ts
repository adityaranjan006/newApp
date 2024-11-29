import { create } from 'zustand';

export interface Bed {
    id: number;
    temperatureValue: number;
    isActive: boolean;
    isLeftSide: boolean;
    currentTemperature: number;
}

interface BedMattressStore {
    bed: Bed;
    setTemperatureValue(value: number): void;
    toggleActive(): void;
    setCurrentTemperature(value: number): void;
}

export const useBedStore = (isLeftSide: boolean) => create<BedMattressStore>((set) => ({
    bed: {
        id: 1,
        temperatureValue: 20,
        isActive: false,
        isLeftSide,
        currentTemperature: 0,
    },
    setTemperatureValue: (value: number) =>
        set((state) => ({
            bed: { ...state.bed, temperatureValue: value }
        })),
    toggleActive: () =>
        set((state) => ({
            bed: { ...state.bed, isActive: !state.bed.isActive }
        })),
    setCurrentTemperature: (value: number) =>
        set((state) => ({
            bed: { ...state.bed, currentTemperature: value }
        }))
}));



export const useLeftBed = useBedStore(true)
export const useRightBed = useBedStore(false)



