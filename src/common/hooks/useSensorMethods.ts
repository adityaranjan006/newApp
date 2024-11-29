import { Sensor, SensorStore } from "../../SensorData";

export const useSensorMethods = () => {
    const setData = SensorStore((state) => state.setSensorData)
    return { 
        setData
     };
};