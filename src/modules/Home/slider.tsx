import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import * as Haptics from "expo-haptics";
import ColorPickerSlider from "./slider-base/semiCircularSlider";
import { Bed } from "../../BedStore";
import { constants } from "../../constants/CONSTANTS";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useHubState } from "../../HubStore";

interface Props {
  min: number;
  max: number;
  val?: number;
  active?: boolean;
  bed: Bed;
  setTemp: (value: number) => void
  setActive: () => void;
}

const Slider: React.FC<Props> = ({ min, max, active, bed, setTemp, setActive }) => {
  const [radius, setRadius] = useState(150);
  const {disabledState} = useHubState();
  const handleToggle = () => {
    setActive();
  };
  function handleSliderChange(val: number) {
    if (val === bed.temperatureValue) {
      return;
    }
    // Round the value to the nearest integer
    const roundedVal = Math.round(val);
        setTemp(roundedVal);
      Haptics.selectionAsync();
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

  const buttonColor = active ? "transparent" : constants["btn-primary-inactive-color"];
  const buttonTextColor = active ? constants["text-primary-active-color"] : constants["text-primary-inactive-color"];

  return (
    <View style={[styles.container]}>
      <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 16, width: "100%" }}>
        <Text style={[styles.meterText, { marginBottom: 0}]}>
          {min}
        </Text>

        <View
          style={{ justifyContent: "center", flexDirection: "row", flex: 1, position: "relative" }}
          onLayout={(ev) => {
            const w = ev.nativeEvent.layout.width;
            setRadius(w / 2);
          }}
        >
          <View style={{flex:1, justifyContent:"center",alignItems:"center", transform: [{ rotate: "-30deg" }], pointerEvents: active ? "auto" : "none" }}>
            <ColorPickerSlider
              thumbColor={active ? constants["thumb-active-color"] : constants["thumb-inactive-color"]}
              trackStrokeWidth={12}
              gestureDisabled={!active}
              trackRadius={radius}
              circleType={"Top"}
              value={bed.temperatureValue}
              onChangeColor={(color) => { }}
              onValueChange={handleSliderChange}
              linearGradient={[
                { color: active ? "#0F3BB7" : "#A9A9A9", offset: 0 },
                { color: active ? "#0F30B7" : "#A9A9A9", offset: 0.2 }, 
                { color: active ? "#0F3BB7" : "#A9A9A9", offset: 0.4 }, 
                { color: active ? "#9E1414" : "#A9A9A9", offset: 0.7 },
                { color: active ? "#9E1414" : "#A9A9A9", offset: 1 },
              ]}
              maxValue={constants["max-temperature-value"]}
              minValue={constants["min-temperature-value"]}
              paddingVertical={175}
              trackWidth={20}
              thumbRadius={15}
            />
          </View>

          <View style={[styles.centerTextContainer]}>
            <Text style={{ fontSize: 15, color: buttonTextColor }}>
              {(function () {
                if (bed.temperatureValue === midNum) {
                  return active ? "Room Temp" : "Device is OFF";
                }
                return active ? bed.temperatureValue < midNum ? "cooling to" : "heating to" : "Device is OFF";
              })()}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 50, color: buttonTextColor, fontWeight: "400" }}>
                {active ? bed.temperatureValue : "--"}
              </Text>
              <Text style={{ fontSize: 30, color: buttonTextColor, fontWeight: "400" }}>{active ? "°C" : ""}</Text>
            </View>
            <Text style={{ fontSize: 15, color: buttonTextColor, fontWeight: "500" }}>
              {active ? `at ${bed.currentTemperature}°C now` : ""}
            </Text>
            <View style={{ marginTop: 30, flexDirection: "row", gap: 20,alignItems: "center", justifyContent: "center"  }}>
                <View>
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
                </View>
                <View style={{justifyContent: "center" }}>
                    <Switch
                      style={{ transform: [{ scale: 1.5 }] }}
                      value={bed.isActive}
                      onValueChange={handleToggle}
                      trackColor={{
                        false: constants["btn-primary-inactive-color"],
                        true: "#0D2F93",
                      }}
                      disabled={disabledState}
                      thumbColor={bed.isActive ? constants["thumb-active-color"] : "#f4f3f4"}
                    />
                  </View>
                <View>
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
          </View>
        </View>
        <Text style={{ ...styles.meterText, marginBottom: 0}}>
          {max}
        </Text>
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
  },
  centerTextContainer: {
    position: "absolute",
    top: "25%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 50,
    paddingHorizontal: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    margin: 10,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth:1,
    borderColor:"#A9A9A9",
  },
  buttonTextPlus: {
    flex:1,
    fontSize: 35,
    justifyContent:"center",
    alignItems:"center",
  },
  buttonTextMinus: {
    flex:1,
    fontSize: 35,
    justifyContent:"center",
    alignItems:"center",
  },
  btn: { 
    width: wp('10%'),
    height: hp('10%'),
    justifyContent: 'center', 
    alignItems: 'center',
}
});
export default Slider;
