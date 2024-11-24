import { useMemo, useState } from "react";
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

const Slider: React.FC<Props> = ({ min, max, active, bed, setTemp }) => {
  const [radius, setRadius] = useState(25);
  function handleSliderChange(val: number) {
    if (val === bed.temperatureValue) {
      return;
    }
    // Round the value to the nearest integer
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

  return (
    <View style={[styles.container, { pointerEvents: active ? "auto" : "none" }]}>
      <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 16, width: "100%" }}>
        <Text style={[styles.meterText, { marginBottom: 14 }, { color: buttonTextColor }]}>
          {min}
        </Text>

        <View
          style={{ justifyContent: "center", flexDirection: "row", flex: 1, position: "relative" }}
          onLayout={(ev) => {
            const w = ev.nativeEvent.layout.width;
            setRadius(w / 2);
          }}
        >
          <View style={{justifyContent:"center",alignItems:"center"}}>
            <ColorPickerSlider
              thumbColor={active ? constants["thumb-active-color"] : constants["thumb-inactive-color"]}
              trackStrokeWidth={15}
              gestureDisabled={!active}
              trackRadius={radius}
              circleType={"Top"}
              value={bed.temperatureValue}
              onChangeColor={(color) => { }}
              onValueChange={handleSliderChange}
              linearGradient={[
                { color: active ? "#0000FF" : "#A9A9A9", offset: 0 },
                { color: active ? "#00FF00" : "#A9A9A9", offset: 0.2 }, 
                { color: active ? "#FFA500" : "#A9A9A9", offset: 0.4 }, 
                { color: active ? "#FF4500" : "#A9A9A9", offset: 0.7 },
                { color: active ? "#FF0000" : "#A9A9A9", offset: 1 },
              ]}
              maxValue={constants["max-temperature-value"]}
              minValue={constants["min-temperature-value"]}
              paddingVertical={10}
              trackWidth={22}
            />
          </View>

          <View style={[styles.centerTextContainer]}>
            <Text style={{ fontSize: 20, color: buttonTextColor }}>
              {(function () {
                if (bed.temperatureValue === midNum) {
                  return active ? "Room Temp" : "Device is OFF";
                }
                return active ? bed.temperatureValue < midNum ? "Cooling down" : "Warming up" : "Device is OFF";
              })()}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 60, color: buttonTextColor, fontWeight: "500" }}>
                {active ? bed.temperatureValue : "--"}
              </Text>
              <Text style={{ fontSize: 30, color: buttonTextColor, fontWeight: "500" }}>{active ? "°C" : ""}</Text>
            </View>
            <Text style={{ fontSize: 16, color: buttonTextColor, fontWeight: "500" }}>
              {active ? `${"Current Temperature:"} ${bed.currentTemperature}` : ""}
            </Text>
          </View>
        </View>

        <Text style={{ ...styles.meterText, marginBottom: 14, color: buttonTextColor }}>
          {max}
        </Text>
      </View>
      <View style={{ marginTop: 54, flexDirection: "row", gap: 20 }}>
        <Pressable
          style={[styles.button, { backgroundColor: active ? (isPressedMinus ? constants["pressed-active-color"] : buttonColor) : buttonColor }]}
          onPressIn={() => {
            setIsPressedMinus(true);
            if (active) decrement();
          }}
          onPressOut={() => setIsPressedMinus(false)}
        >
          <Text style={[styles.buttonTextMinus, { color: constants["text-primary-active-color"] }]}>-</Text>
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: active ? (isPressedPlus ? constants["pressed-active-color"] : buttonColor) : buttonColor }]}
          onPressIn={() => {
            setIsPressedPlus(true);
            if (active) increment();
          }}
          onPressOut={() => setIsPressedPlus(false)}
        >
          <Text style={[styles.buttonTextPlus, { color: constants["text-primary-active-color"] }]}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  meterText: {
    fontSize: 16,
    fontWeight: "bold",
    color: constants["text-primary-active-color"]
  },
  centerTextContainer: {
    position: "absolute",
    top: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    margin: 10,
    width: 70,
    height: 70,
  },
  buttonTextPlus: {
    fontSize: 30,
    marginBottom: 2,
    paddingHorizontal: 3,
    fontWeight: "bold",
  },
  buttonTextMinus: {
    fontSize: 28,
    marginBottom: 2,
    paddingHorizontal: 3,
    fontWeight: "bold",
  },
});
export default Slider;
