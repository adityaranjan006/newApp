import { useState, useEffect, useCallback, useRef } from "react";
import { apiClient } from "../apiClient";
import { useOverlay } from "./useOverlay";
import { useHub } from "./useHub";
import { Bed, useLeftBed, useRightBed } from "../../BedStore";
import { constants } from "../../constants/CONSTANTS";


export function usePollingEffect(trigger: boolean) {
  const [isInitComplete, setIsInitComplete] = useState(false);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const {setOverlay} = useOverlay();
  const {setDisabledState} = useHub();
  const leftBedState = useLeftBed((state) => state.bed);
  const rightBedState = useRightBed((state) => state.bed);

  const disableLeft = (lBed: Bed) => lBed.isActive ? useLeftBed.setState((state) => ({ ...state, bed: { ...state.bed, isActive: false } })) : null;
  const disableRight = (rBed: Bed) => rBed.isActive ? useRightBed.setState((state) => ({ ...state, bed: { ...state.bed, isActive: false } })) : null;

  const primePollingInit = useCallback(async () => {
    try {
      console.log("Calling Init API...");
      const response = await apiClient.post("/hub/prime", { 
        prime_hub: true,
      });
      if (response.status !== 204) throw new Error(`Init API failed: ${response.status}`,{

      });
      console.log("Init API succeeded.");
      setOverlay(true);
      setIsInitComplete(true);
    } catch (error) {
      console.error("Error in Init API:", error);
      setIsInitComplete(false);
    }
  }, []);

  const primePollingStatus = useCallback(async () => {
    try {
      const response = await apiClient.post("/hub/prime",{
        
      });

      if (response.status!==200) throw new Error(`Polling API failed: ${response.status}`);
      if(response.data.priming === false){
        setOverlay(false);
        setDisabledState(false);
      }
      else{
        setDisabledState(true);
        setOverlay(true);
      }
      const data = response.data;
      console.log("Polling API response:", data);
    } catch (error) {
      console.error("Error in Polling API:", error);
    }
  }, []);

  useEffect(() => {
    if (trigger) {
      primePollingInit().then(() => {
        if (isInitComplete) {
          console.log("Starting polling...");
          intervalIdRef.current = setInterval(primePollingStatus, constants["polling-primeHub-interval"]);
        }
      });
    } else {
      console.log("Stopping polling...");
      setOverlay(false);
      setDisabledState(true);
      disableLeft(leftBedState);
      disableRight(rightBedState);
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    }

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [trigger, isInitComplete, primePollingInit, primePollingStatus]);
}