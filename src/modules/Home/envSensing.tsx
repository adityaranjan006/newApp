import { StyleSheet, View } from "react-native";
import ListCard from "./listCard";
import { AQIGradient, eCO2Gradient, HumGradient, PM25Gradient, PMGradient, TempGradient, TVOCDGradient } from "../../constants/LISTCARD";
import { SensorStore } from "../../SensorData";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Description } from "../../constants/LISTCARD";


export default function EnvironmentSensing() {
    const sensorData = SensorStore((state) => state.sensorData);
    return (
        <View style={styles.container}>
            <ListCard name="TEMPERATURE" unit={"°C"} description={Description.TEMPERATURE} valNum={sensorData.TEMPERATURE} gradientColors={TempGradient}/>
            <ListCard name="HUMIDITY" unit={"%RH"} description={Description.HUMIDITY} valNum={sensorData.HUMIDITY} gradientColors={HumGradient}/>
            <ListCard name="PM1.0" unit={"µg/m³"} description={Description.PM1} valNum={sensorData.PM1} gradientColors={PMGradient}/>
            <ListCard name="PM2.5" unit={"µg/m³"} description={Description.PM25} valNum={sensorData.PM25} gradientColors={PM25Gradient}/>
            <ListCard name="PM10" unit={"µg/m³"} description={Description.PM10} valNum={sensorData.PM10} gradientColors={PMGradient}/>
            <ListCard name="TVOC" unit={"ppb"} description={Description.TVOC} valNum={sensorData.TVOC} gradientColors={TVOCDGradient}/>
            <ListCard name="eCO2" unit={"ppm"} description={Description.eCO2} valNum={sensorData.eCO2} gradientColors={eCO2Gradient}/>
            <ListCard name="AQI" unit={""} description={Description.AQI} valNum={sensorData.AQI} gradientColors={AQIGradient}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "center",
        alignItems:"center",
        paddingVertical: 10,
        maxWidth: wp("100%")
    },
});
