import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { cardGradient, constants } from "../../constants/CONSTANTS";
import { LinearGradient } from "expo-linear-gradient";
import { sensorDataRange } from "../../constants/LISTCARD";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AQICondition, condition } from "../../utils/calculateCondition";



export default function ListCard({ name, unit, valNum, gradientColors,  description}: { name: string, unit: string, valNum: number, gradientColors: string[], description: string }) {
    function calucalteProgress(){
        if(sensorDataRange[name]){
            const [min,max]=sensorDataRange[name];
            return Math.min(1, Math.max(0, ((valNum-min)/(max-min))));
        }
        return 0;
    }
    const progress = calucalteProgress();
    const [progressBarWidth, setProgressBarWidth] = useState(0);
    return (
        <LinearGradient 
        colors={cardGradient}
        style={styles.constainerCard}
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 1 }}
    >
        <View style={styles.container}>
            <View style={styles.textContainer}> 
                <Text style={styles.textName}>{name}</Text>
                <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",gap:5}}>
                    <Text style={styles.textValue}>{`${valNum}${unit}`}</Text>
                    {name==="AQI"?(<Text style={styles.textDescription}>
                        {AQICondition({value:valNum})}
                    </Text>):""}    
                </View>
            </View>
            {/* <View style={styles.decriptionContainer}>
                <Text style={styles.textDescription}>
                    {condition({name,value:valNum})}s
                </Text>
            </View> */}
            <View
                style={styles.progressBarContainer}
                onLayout={(event) => {
                    const { width } = event.nativeEvent.layout;
                    setProgressBarWidth(width);
                }}
            >
                <LinearGradient
                    colors={gradientColors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.progressBar}
                />
                <View
                    style={[
                        styles.thumb,
                        { left: progressBarWidth * progress - 6 } 
                    ]}
                />
            </View>
        </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    constainerCard:{
        width: '95%',
        height: hp("10%"),
        padding: 4,
        marginVertical: 5,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: "rgba(255, 255, 255, 0.3)",
        backgroundColor: "#2c2c2c", 
        shadowColor: "#000000", 
        shadowOffset: { width: 0, height: 5 }, 
        shadowOpacity: 0.3, 
        shadowRadius: 10, 
        elevation: 5, 
        justifyContent: "space-between",
        alignItems:"center"
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    container: {
        flexDirection: "column",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical:2,
        width: "100%",
        height:"100%",
        rowGap:5,
        justifyContent:"space-evenly",
    },
    textContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    textValue: {
        fontSize: 15,
        fontWeight: "bold",
        color: constants["text-primary-active-color"],
        marginBottom: 2
    },
    textName: {
        fontSize: 10,
        color: constants["text-primary-inactive-color"]
    },
    progressBarContainer: {
        width: "100%",
        height: 5,
        borderRadius: 10,
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
    },
    progressBar: {
        width: "100%", 
        height: "100%",
        borderRadius: 10,
    },
    thumb: {
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: 6,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: constants["text-primary-active-color"],
        top: (5 - 10) / 2, //Adjust thumb position the height of the progressBarContainer is changed -->top: (progressBarContainer.height-10)/2
        zIndex: 2,
        overflow: "hidden"
    },
    decriptionContainer:{
        width:"100%",
    },
    textDescription: {
        fontSize: 11,
        color: constants["text-primary-active-color"],
    }
});
