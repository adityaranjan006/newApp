import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ToastAndroid, Animated } from "react-native";
import { useDebouncedCallback } from "use-debounce";
import { apiClient } from "../../common/apiClient";
import axios from "axios";
import { Bed, useLeftBed, useRightBed } from "../../BedStore";
import { useBedMethods } from "../../common/hooks/useBedMethods";
import { constants } from "../../constants/CONSTANTS";
import Slider from "./slider";
import { heightPercentageToDP as hp,widthPercentageToDP as wp } from "react-native-responsive-screen";
import BedSide from "../../../assets/icons/bedS.svg";
import BG from "./background"

enum ActiveButton {
    Left = 1,
    Right = 2,
}

const LFTRFT = () => {
    const [activeButton, setActiveButton] = useState<ActiveButton>(ActiveButton.Left);
    const isInitialMount = useRef(true);
    const { lBed, rBed, setLeftBed, setRightBed } = useBedMethods();
    const [ bgLeft,setBgLeft] = useState("#000000")
    const [ bgRight,setBgRight] = useState("#000000")

    const getColorByTemperature = (temperature: number) => {
        if (temperature === 25) return "#222258";
        if (temperature > 25) return "#220608";
        return "#0F3BB7";
    };

    const updateBGColor = (lBed: Bed, rBed: Bed) => {
        if(lBed.isActive) {
            setBgLeft(getColorByTemperature(lBed.temperatureValue));
        }
        else{
            setBgLeft("#000000")
        }
        if(rBed.isActive) {
            setBgRight(getColorByTemperature(rBed.temperatureValue));
        }
        else{
            setBgRight("#000000")
        }
    };
    
    const handleButtonPress = (button: ActiveButton) => {
        if (activeButton !== button) {
            setActiveButton(button);
        }
    };

    const debouncedTemperatureCallback = useDebouncedCallback(async (bed: Bed, value: number) => {
        const Bed_side = bed.isLeftSide ? "Left" : "Right";
        try {
            const data = { 
                    left_side:{
                        status:lBed.isActive?"active":"inactive",
                        target_temperature:lBed.temperatureValue
                    },
                    right_side:{
                        status:rBed.isActive?"active":"inactive",
                        target_temperature:rBed.temperatureValue
                    }
            };
            const response = await apiClient.post('/hub/control', data, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.status === 200) {
                console.log(`${Bed_side} bed temperature update successful:`);
            } else {
                console.warn(`${Bed_side} bed temperature update failed:`, response.status, response.data);
            }
        } catch (error) {
            console.error(`Error updating ${Bed_side} bed temperature:`, error);
            if (axios.isAxiosError(error)) {
                console.error('\nAxios error:', error.message);
                console.error('\nError config:', error.config);
                if (error.response) {
                    console.error('\nResponse data:', error.response.data);
                    console.error('\nResponse status:', error.response.status);
                }
            } else {
                console.error('Unexpected error:', error);
            }
        }
    }, constants["temp-api-debounce-time"]);

    const debouncedActiveCallback = useDebouncedCallback(async (bed: Bed) => {
        const Bed_side = bed.isLeftSide ? "Left" : "Right";
        try {
            const data = { 
                    left_side:{
                        status:lBed.isActive?"active":"inactive",
                        target_temperature:lBed.temperatureValue
                    },
                    right_side:{
                        status:rBed.isActive?"active":"inactive",
                        target_temperature:rBed.temperatureValue
                    }
            };
            const response = await apiClient.post('/hub/control', data, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status === 200) {
                console.log(`${Bed_side} bed active state update successful`);
                if (bed.isActive) { 
                    debouncedTemperatureCallback(bed, bed.temperatureValue);
                }
            } else {
                console.warn(`${Bed_side} bed active state update failed:`, response.status, response.data);
            }
        } catch (error) {
            console.error(`Error updating ${Bed_side} bed active state:`, error);
            if (axios.isAxiosError(error)) {
                console.error('\nAxios error:', error.message);
                console.error('\nError config:', error.config);
                if (error.response) {
                    console.error('\nResponse data:', error.response.data);
                    console.error('\nResponse status:', error.response.status);
                }
            } else {
                console.error('Unexpected error:', error);
            }
        }
    }, constants["active-api-debounce-time"]);

    useEffect(() => {
        if (!isInitialMount.current) {
            const activeBed = activeButton === ActiveButton.Left ? lBed : rBed;
            debouncedTemperatureCallback(activeBed, activeBed.temperatureValue);
            updateBGColor(lBed,rBed)
        }
        return () => {
            debouncedTemperatureCallback.cancel();
        };
    }, [lBed.temperatureValue, rBed.temperatureValue, debouncedTemperatureCallback]);

    useEffect(() => {
        if (!isInitialMount.current) {
            const activeBed = activeButton === ActiveButton.Left ? lBed : rBed;
            debouncedActiveCallback(activeBed);
            updateBGColor(lBed,rBed)
        } else {
            isInitialMount.current = false;
        }
        return () => {
            debouncedActiveCallback.cancel();
        };
    }, [lBed.isActive, rBed.isActive, debouncedActiveCallback]);

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
                <Slider
                    min={constants["min-temperature-value"]}
                    max={constants["max-temperature-value"]}
                    val={lBed.temperatureValue}
                    active={lBed.isActive}
                    bed={lBed}
                    setTemp={setLeftBed}
                    setActive={useLeftBed((state) => state.toggleActive)}
                />
        </>
    ) : (
        <>
                <Slider
                    min={constants["min-temperature-value"]}
                    max={constants["max-temperature-value"]}
                    val={rBed.temperatureValue}
                    active={rBed.isActive}
                    bed={rBed}
                    setTemp={setRightBed}
                    setActive={useRightBed((state) => state.toggleActive)}
                />
        </>
    );

    return (
        <SafeAreaView>
            <BG style={{ position: "absolute", marginTop:-120 }} color1={activeButton===ActiveButton.Left?bgLeft:bgRight} color2="#010103"/>
            <View style={styles.container}>
                <View style={{ width: '95%',maxWidth: wp("100%"),position:"relative", justifyContent: "center" }}>
                    {activeBedContent}
                </View>
                <View>
                    <BedSide/>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={leftButtonStyle}
                        onPress={() => handleButtonPress(ActiveButton.Left)}
                    >
                        <Text style={styles.buttonText}>L</Text>
                    </TouchableOpacity>              
                    <TouchableOpacity
                        style={rightButtonStyle}
                        onPress={() => handleButtonPress(ActiveButton.Right)}
                    >
                        <Text style={styles.buttonText}>R</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: -40,
        paddingVertical: 10,
        width: "100%",
        height:hp("80%"),
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "75%",
        paddingHorizontal: 4,
        paddingVertical:4,
        marginTop:0,
        backgroundColor: "#1A1A1A",
        borderRadius:20
    },
    button: {
        flex: 1,
        padding: 4,
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
});

export default LFTRFT;
