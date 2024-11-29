import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { constants } from "../../constants/CONSTANTS";
export default function BasicCard({Icon,name,value,color}:{Icon:keyof typeof MaterialCommunityIcons.glyphMap,name:string, value:string,color:string}){
    return (
        <View style={styles.container}>
            <View>
                <MaterialCommunityIcons name={Icon} size={35} color={color} />
            </View>
            <View>
                <Text style={styles.textValue}>{value}</Text>
                <Text style={styles.textName}>{name.toUpperCase()}</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        width: "50%",
        gap:10
    },
    textContainer: {
        flexDirection: "column",
        alignItems: "flex-start",
        marginLeft: 15,
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
    }
});
