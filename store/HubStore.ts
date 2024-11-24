import { create } from "zustand";

interface State {
  prime_hub:boolean;
  disabledState:boolean;
  togglePrimeHub():void;
  setDisabledState(status:boolean):void;
}

export const useHubState = create<State>((set) => ({
  prime_hub:false,
  disabledState:false,
  togglePrimeHub:()=>set((state)=>({prime_hub:!state.prime_hub})),
  setDisabledState:(status:boolean)=>set(({disabledState:status}))
}));
