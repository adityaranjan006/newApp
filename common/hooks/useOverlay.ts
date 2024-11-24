import { useOverlayStore } from "@/store/OverlayStore";

export const useOverlay = () =>{
    const isOverlayVisible = useOverlayStore((state)=>state.isOverlayVisible);
    const setOverlay = useOverlayStore((state)=>state.setOverlay);
    return {
        isOverlayVisible,
        setOverlay
    }
}