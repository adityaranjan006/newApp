import { Sensor, SensorStore } from "@/store/SensorData";

export const useSensorMethods = () => {
    const setData = SensorStore((state) => state.setSensorData)
    return { 
        setData
     };
};