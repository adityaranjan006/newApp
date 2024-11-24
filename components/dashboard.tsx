import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ToastAndroid } from "react-native";
import { useDebouncedCallback } from "use-debounce";
import { apiClient } from "@/common/apiClient";
import axios from "axios";
import { Bed, useLeftBed, useRightBed } from "@/store/BedStore";
import { useBedMethods } from "@/common/hooks/useBedMethods";
import { constants } from "@/constants/CONSTANTS";
// import ToggleComponent from "@/components/toggle";
// import Slider from "@/components/slider";
import { heightPercentageToDP as hp,widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useHub } from "@/common/hooks/useHub";
import { useOverlay } from "@/common/hooks/useOverlay";

enum ActiveButton {
    Left = 1,
    Right = 2,
}

const LFTRFT = () => {
    const [activeButton, setActiveButton] = useState<ActiveButton>(ActiveButton.Left);
    const isInitialMount = useRef(true);
    const { lBed, rBed, setLeftBed, setRightBed } = useBedMethods();
    const { disabledState } = useHub();
    
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
        }
        return () => {
            debouncedTemperatureCallback.cancel();
        };
    }, [lBed.temperatureValue, rBed.temperatureValue, debouncedTemperatureCallback]);

    useEffect(() => {
        if (!isInitialMount.current) {
            const activeBed = activeButton === ActiveButton.Left ? lBed : rBed;
            debouncedActiveCallback(activeBed);
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
            {/* <ToggleComponent bed={lBed} setActive={useLeftBed((state) => state.toggleActive)} />
                <Slider
                    min={constants["min-temperature-value"]}
                    max={constants["max-temperature-value"]}
                    val={lBed.temperatureValue}
                    active={lBed.isActive}
                    bed={lBed}
                    setTemp={setLeftBed}
                /> */}
        </>
    ) : (
        <>
            {/* <ToggleComponent bed={rBed} setActive={useRightBed((state) => state.toggleActive)} />
                <Slider
                    min={constants["min-temperature-value"]}
                    max={constants["max-temperature-value"]}
                    val={rBed.temperatureValue}
                    active={rBed.isActive}
                    bed={rBed}
                    setTemp={setRightBed}
                /> */}
        </>
    );

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={leftButtonStyle}
                        onPress={() => handleButtonPress(ActiveButton.Left)}
                        disabled={disabledState}
                    >
                        <Text style={styles.buttonText}>LEFT</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={rightButtonStyle}
                        onPress={() => handleButtonPress(ActiveButton.Right)}
                        disabled={disabledState}
                    >
                        <Text style={styles.buttonText}>RIGHT</Text>
                    </TouchableOpacity>
                </View>
{/* 
                <View style={{ width: '95%',maxWidth: wp("100%"),position:"relative", justifyContent: "center" }}>
                    {activeBedContent}
                </View> */}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: 40,
        marginBottom: -40,
        paddingVertical: 10,
        width: "100%",
        height:hp("80%"),
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        paddingHorizontal: 5,
        marginTop:-30
    },
    button: {
        flex: 1,
        padding: 15,
        backgroundColor: constants["btn-secondary-inactive-color"],
        borderRadius: 5,
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
