import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import * as Haptics from "expo-haptics";
import ColorPickerSlider from "./slider-base/semiCircularSlider";
import { Bed } from "@/store/BedStore";
import { constants } from "@/constants/CONSTANTS";

interface Props {
    min: number;
    max: number;
    val?: number;
    active?: boolean;
    bed: Bed;
    setTemp: (value: number) => void
}

const NewSlider: React.FC<Props> = ({ min, max, active, bed, setTemp }) => {
    function handleSliderChange(val: number) {
        if (val === bed.temperatureValue) {
          return;
        }
        const roundedVal = Math.round(val);
        if (roundedVal !== bed.temperatureValue) {
          if (roundedVal > bed.temperatureValue) {
            setTemp(roundedVal);
          } else if (roundedVal < bed.temperatureValue) {
            setTemp(roundedVal);
          }
          Haptics.selectionAsync();
        }
      }

      const midNum =constants["mid-temperature-value"];

      function decrement() {
        if (bed.temperatureValue > constants["min-temperature-value"]) {
          setTemp(bed.temperatureValue - 1);
          Haptics.selectionAsync();
        }
      }
    
      function increment() {
        if (bed.temperatureValue < constants["max-temperature-value"]) {
          setTemp(bed.temperatureValue + 1);
          Haptics.selectionAsync();
        }
      }

      const [isPressedPlus, setIsPressedPlus] = useState(false);
      const [isPressedMinus, setIsPressedMinus] = useState(false);

      const buttonColor = active ? constants["btn-primary-active-color"] : constants["btn-primary-inactive-color"];
      const buttonTextColor = active ? constants["text-primary-active-color"] : constants["text-primary-inactive-color"];
      
    return(
        <View style={[styles.container, { pointerEvents: active ? "auto" : "none" }]}>
            <Text>Hello Slider</Text>
            
        </View>
    ) 
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 5,
    }
})

export default NewSlider;