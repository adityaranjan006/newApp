import { useLeftBed, useRightBed } from "@/store/BedStore";


export const useBedMethods = () => {
    const lBed = useLeftBed((state) => state.bed);
    const rBed = useRightBed((state) => state.bed);
    const setLeftBed   = useLeftBed((state) => state.setTemperatureValue)
    const setRightBed  = useRightBed((state) => state.setTemperatureValue)
    const setCurrLeftTemp = useLeftBed((state) => state.setCurrentTemperature)
    const setCurrRightTemp = useRightBed((state) => state.setCurrentTemperature)
    return {
        lBed,
        rBed,
        setLeftBed,
        setRightBed,
        setCurrLeftTemp,
        setCurrRightTemp
    }
}


