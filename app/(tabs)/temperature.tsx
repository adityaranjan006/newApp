import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useEffect, useRef, useState } from 'react';
import { useBedMethods } from '@/common/hooks/useBedMethods';
import { useHub } from '@/common/hooks/useHub';
import { constants } from '@/constants/CONSTANTS';
import axios from 'axios';
import { useDebouncedCallback } from 'use-debounce';
import { apiClient } from '@/common/apiClient';
import { Bed } from '@/store/BedStore';
import bedImage from '@/assets/images/bed.png';
import Slider from '@/components/slider';
import ColorPickerSlider from '@/components/slider-base/semiCircularSlider';
import NewSlider from '@/components/newSlider';
enum ActiveButton {
  Left = 1,
  Right = 2,
}

export default function TabOneScreen() {
  const [activeButton, setActiveButton] = useState<ActiveButton>(ActiveButton.Left);
  const isInitialMount = useRef(true);
  const { lBed, rBed, setLeftBed, setRightBed } = useBedMethods();
  const { disabledState } = useHub();
  const [active, setActive] = useState(true);
  const handleButtonPress = (button: ActiveButton) => {
    if (activeButton !== button) {
        setActiveButton(button);
    }
};


// const debouncedTemperatureCallback = useDebouncedCallback(async (bed: Bed, value: number) => {
//   const Bed_side = bed.isLeftSide ? "Left" : "Right";
//   try {
//       const data = { 
//               left_side:{
//                   status:lBed.isActive?"active":"inactive",
//                   target_temperature:lBed.temperatureValue
//               },
//               right_side:{
//                   status:rBed.isActive?"active":"inactive",
//                   target_temperature:rBed.temperatureValue
//               }
//       };
//       const response = await apiClient.post('/hub/control', data, {
//           headers: { 'Content-Type': 'application/json' },
//       });
//       if (response.status === 200) {
//           console.log(`${Bed_side} bed temperature update successful:`);
//       } else {
//           console.warn(`${Bed_side} bed temperature update failed:`, response.status, response.data);
//       }
//   } catch (error) {
//       console.error(`Error updating ${Bed_side} bed temperature:`, error);
//       if (axios.isAxiosError(error)) {
//           console.error('\nAxios error:', error.message);
//           console.error('\nError config:', error.config);
//           if (error.response) {
//               console.error('\nResponse data:', error.response.data);
//               console.error('\nResponse status:', error.response.status);
//           }
//       } else {
//           console.error('Unexpected error:', error);
//       }
//   }
// }, constants["temp-api-debounce-time"]);

// const debouncedActiveCallback = useDebouncedCallback(async (bed: Bed) => {
//   const Bed_side = bed.isLeftSide ? "Left" : "Right";
//   try {
//       const data = { 
//               left_side:{
//                   status:lBed.isActive?"active":"inactive",
//                   target_temperature:lBed.temperatureValue
//               },
//               right_side:{
//                   status:rBed.isActive?"active":"inactive",
//                   target_temperature:rBed.temperatureValue
//               }
//       };
//       const response = await apiClient.post('/hub/control', data, {
//           headers: { 'Content-Type': 'application/json' },
//       });

//       if (response.status === 200) {
//           console.log(`${Bed_side} bed active state update successful`);
//           if (bed.isActive) {
//               debouncedTemperatureCallback(bed, bed.temperatureValue);
//           }
//       } else {
//           console.warn(`${Bed_side} bed active state update failed:`, response.status, response.data);
//       }
//   } catch (error) {
//       console.error(`Error updating ${Bed_side} bed active state:`, error);
//       if (axios.isAxiosError(error)) {
//           console.error('\nAxios error:', error.message);
//           console.error('\nError config:', error.config);
//           if (error.response) {
//               console.error('\nResponse data:', error.response.data);
//               console.error('\nResponse status:', error.response.status);
//           }
//       } else {
//           console.error('Unexpected error:', error);
//       }
//   }
// }, constants["active-api-debounce-time"]);

// useEffect(() => {
//   if (!isInitialMount.current) {
//       const activeBed = activeButton === ActiveButton.Left ? lBed : rBed;
//       debouncedTemperatureCallback(activeBed, activeBed.temperatureValue);
//   }
//   return () => {
//       debouncedTemperatureCallback.cancel();
//   };
// }, [lBed.temperatureValue, rBed.temperatureValue, debouncedTemperatureCallback]);

// useEffect(() => {
//   if (!isInitialMount.current) {
//       const activeBed = activeButton === ActiveButton.Left ? lBed : rBed;
//       debouncedActiveCallback(activeBed);
//   } else {
//       isInitialMount.current = false;
//   }
//   return () => {
//       debouncedActiveCallback.cancel();
//   };
// }, [lBed.isActive, rBed.isActive, debouncedActiveCallback]);

const leftButtonStyle = [
  styles.button,
  { opacity: activeButton === ActiveButton.Left ? 1 : 0.5 },
  activeButton === ActiveButton.Left && styles.activeButton
];

const rightButtonStyle = [
  styles.button,
  { opacity: activeButton === ActiveButton.Right ? 1 : 0.5 },
  activeButton === ActiveButton.Right && styles.activeButton
];

const activeBedContent = activeButton === ActiveButton.Left ? (
  <>
          <NewSlider
              min={constants["min-temperature-value"]}
              max={constants["max-temperature-value"]}
              val={lBed.temperatureValue}
              active={true}
              bed={lBed}
              setTemp={setLeftBed}
          />
  </>
) : (
  <>
          <NewSlider
              min={constants["min-temperature-value"]}
              max={constants["max-temperature-value"]}
              val={rBed.temperatureValue}
              active={true}
              bed={rBed}
              setTemp={setRightBed}
        />
  </>
);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.slider}>
        {activeBedContent}
      </View>
      <View style={styles.bedAndButtons}>
        <View>
          <Image source={bedImage}/>
        </View>
        <View style={styles.row}>
                    <TouchableOpacity
                        style={leftButtonStyle}
                        onPress={() => handleButtonPress(ActiveButton.Left)}
                        disabled={disabledState}
                    >
                        <Text style={styles.buttonText}>L</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={rightButtonStyle}
                        onPress={() => handleButtonPress(ActiveButton.Right)}
                        disabled={disabledState}
                    >
                        <Text style={styles.buttonText}>R</Text>
                    </TouchableOpacity>
                </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider:{
    flex:2,
    width:"100%",
    backgroundColor:"grey",
    justifyContent:"center",
    alignItems:"center"
  },
  bedAndButtons:{
    flex:1,
    width:wp("80%"),
    justifyContent:"flex-end",
    alignItems:"center",
    marginBottom:40,
  },
  button: {
    flex: 1,
    padding: 8,
    backgroundColor: constants["btn-secondary-inactive-color"],
    borderRadius: 20,
    elevation: 5,
    marginHorizontal:1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    },
    buttonText: {
        color: constants["text-primary-active-color"],
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
    },
    activeButton: {
        backgroundColor: constants["btn-primary-active-color"],
        color: constants["text-primary-active-color"],
        fontWeight: "800",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      padding:4,
      backgroundColor:"#1A1A1A",
      borderRadius:20
  },
});
