import { create } from "zustand";

export interface Sensor{
    TEMPERATURE:number,
    HUMIDITY:number,
    PM1:number,
    PM25:number,
    PM10:number,
    TVOC:number,
    eCO2:number,
    AQI:number,
}

interface SensorDataStore{
    sensorData:Sensor,
    setSensorData(sensorData:Sensor):void,
}

export const SensorStore = create<SensorDataStore>((set)=>({
    sensorData:{
        TEMPERATURE:0,  
        HUMIDITY:0,
        PM1:0,
        PM25:0,
        PM10:0,
        TVOC:0,
        eCO2:0,
        AQI:0,
    },
    setSensorData: (sensorData) =>
        set((state) => {
          return {
            sensorData: { ...state.sensorData, ...sensorData },
          };
        }),
}))

