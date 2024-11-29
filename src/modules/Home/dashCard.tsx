import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { constants } from "../../constants/CONSTANTS";
import BasicCard from "./basicCard";

export default function DashCard() {
    return ( 
        <LinearGradient 
        colors={[
            constants["card-gradient-start-color"], 
            constants["card-gradient-start-color"],
            constants["card-gradient-start-color"], 
            constants["card-gradient-end-color"]
        ]}
        style={styles.container}
        start={{ x: 1, y: 1 }} 
        end={{ x: 0, y: 0 }}
    >
            <View style={[styles.iconContainer, {flexWrap: "wrap", justifyContent: "center"}]}>
                <BasicCard Icon="thermometer-lines" name="Temperature" value={"22°C"} color="#EE6600"/>
                <BasicCard Icon="lightning-bolt" name="Energy Usage" value={"240 KJ"} color="#FFD700"/>
                <BasicCard Icon="lightbulb" name="Light Intensity" value={"70%"} color="#FFD242"/>
                <BasicCard Icon="water" name="Humidity" value={"35%"} color="#37B1F5"/>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '96%',
        height: 160,
        padding: 15,
        marginVertical: 10,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.3)",
        backgroundColor: "#2c2c2c", 
        shadowColor: "#000000", 
        shadowOffset: { width: 0, height: 5 }, 
        shadowOpacity: 0.3, 
        shadowRadius: 10, 
        elevation: 5, 
        justifyContent: "space-between",
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 10,
        rowGap:12,
    },
    title: {
        color: constants["text-primary-active-color"],
        fontSize: 18,
        fontWeight: "600", 
        textAlign: "center",
        letterSpacing: 0.8, 
    },
    value: {
        color: constants["text-primary-active-color"],
        fontSize: 32,
        fontWeight: "800",
    },
    card: {
        width: 80, // Set a fixed width for each BasicCard
        margin: 5, // Add margin for spacing between cards
    },
});
