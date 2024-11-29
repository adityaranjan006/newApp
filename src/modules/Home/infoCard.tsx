import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { constants } from "../../constants/CONSTANTS";

export default function InfoCard({ title, value, Icon }: { title: string, value: number, Icon: keyof typeof MaterialCommunityIcons.glyphMap }) {
    return ( 
        <LinearGradient 
        colors={[constants["card-gradient-start-color"],
                constants["card-gradient-start-color"],
                constants["card-gradient-start-color"],
                constants["card-gradient-start-color"],
                constants["card-gradient-end-color"]
                ]}
        style={styles.container}
        start={{ x: 1, y: 1 }} 
        end={{ x: 0, y: 0 }}
        
    >
            <View style={styles.iconContainer}>
                <MaterialCommunityIcons name={Icon} size={40} color={constants["text-primary-active-color"]} />
                <Text style={styles.value}>{value}</Text>
            </View>
            <Text style={styles.title}>{title}</Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '45%',
        height: 140,
        padding: 15,
        marginVertical: 10,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
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
    },
    title: {
        color: constants["text-primary-active-color"],
        fontSize: 15,   
        fontWeight: "600", 
        textAlign: "center",
        letterSpacing: 0.8, 
    },
    value: {
        color: constants["text-primary-active-color"],
        fontSize: 26,
        fontWeight: "800",
    },
});
