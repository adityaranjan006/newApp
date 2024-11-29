import {create} from "zustand";

type OverlayState = {
    isOverlayVisible: boolean;
    setOverlay: (overlay: boolean) => void;
};

export const useOverlayStore = create<OverlayState>((set) => ({
    isOverlayVisible: false,
    setOverlay: (overlay: boolean) => set(() => ({ isOverlayVisible: overlay }))
}));
