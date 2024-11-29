import { StyleSheet, View, Text, Dimensions, Switch, } from "react-native";
import { constants } from "../../constants/CONSTANTS";
import { usePollingEffect } from "../../common/hooks/usePolling";
import { useState } from "react";


export function HomeHeader() {
  const [turnOn,setTurnOn] = useState(false);
  usePollingEffect(turnOn)
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 , flexDirection:"row", justifyContent:"space-between",paddingHorizontal:18, alignItems:"center",}}>
        <Text style={styles.nameText}>dreamsleep.</Text>
        <View>
         <Switch value={turnOn} onValueChange={setTurnOn}/>
      </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width:"100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameText: {
    fontSize: 26,
    fontWeight: "bold",
    color: constants["text-primary-active-color"],
  },
});
