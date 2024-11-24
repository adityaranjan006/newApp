import { useHubState } from "@/store/HubStore";

export const useHub = () => {
    const {prime_hub,togglePrimeHub,disabledState,setDisabledState} = useHubState();
    return {
        prime_hub,
        disabledState,
        togglePrimeHub,
        setDisabledState,
    };
}
