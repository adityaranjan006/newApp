import { useEffect } from "react";
import { apiClient } from "../apiClient";
import { useSensorMethods } from "./useSensorMethods";
import { useBedMethods } from "./useBedMethods";
import { constants } from "../../constants/CONSTANTS";
export default function usePollingFetch(){
    const {setData} = useSensorMethods();
    const {setCurrLeftTemp,setCurrRightTemp} = useBedMethods();
    const fetchData = async () =>{
        try {
          const response = await apiClient.get("/hub/sync")
          if(response.status === 200){
            const data = response.data.environment_sensors;
            const currLeftTemp = response.data.bed.left_side.current_temperature;
            const currRightTemp = response.data.bed.right_side.current_temperature;
            const sensorData = {
              TEMPERATURE: data.temperature || 0,
              HUMIDITY: data.relative_humidity || 0,
              PM1: data.PM1_0 || 0,
              PM25: data.PM2_5 || 0,
              PM10: data.PM10 || 0,
              TVOC: data.TVOC || 0,
              eCO2: data.eCO2 || 0,
              AQI: data.AQI || 0,
            };
    
            setData(sensorData);
            setCurrLeftTemp(currLeftTemp);
            setCurrRightTemp(currRightTemp);
          } else {
            console.error("Error in fetching the data");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    
      useEffect(()=>{
        const fetchDataWithHandling = async () => {
        await fetchData();
      };
      const intervalId = setInterval(fetchDataWithHandling, constants["polling-fetch-interval"]); 
      return () => clearInterval(intervalId);
      },[])
}
