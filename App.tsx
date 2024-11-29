import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Home } from "./src/modules/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { constants } from "./src/constants/CONSTANTS";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeHeader } from "./src/modules/Home/header";
import { Environment } from "./src/modules/Home/envLayout";
import {  heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaProvider } from "react-native-safe-area-context";
import usePollingFetch from "./src/common/hooks/usePollingFetch";


const Tab = createBottomTabNavigator();

const tabBarIcon = (IconName:keyof typeof MaterialCommunityIcons.glyphMap, focused:boolean)=>{
  return <MaterialCommunityIcons name={IconName} color={focused?constants["text-primary-active-color"]:constants["text-primary-inactive-color"]} size={hp("4%")}/>
}

export default function App() {
  usePollingFetch();
  return (
    <SafeAreaProvider style={styles.safeContainer} >
      <NavigationContainer>
        <StatusBar translucent style="inverted" />
          <View style={styles.gradient}>
            <HomeHeader />
          </View>
        <Tab.Navigator screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: constants["bg-primary"] },
          tabBarActiveTintColor: constants["text-primary-active-color"],
          tabBarInactiveTintColor: constants["text-primary-inactive-color"],
          tabBarLabelStyle: { fontWeight: 'bold' },
      }}>
          <Tab.Screen name="Temperature Control" component={Home} options={{ headerShown: false, tabBarIcon: ({focused}) => tabBarIcon("temperature-celsius",focused) }} />
          <Tab.Screen name="Environment Sensing" component={Environment} options={{ headerShown: false, tabBarIcon: ({focused}) => tabBarIcon("leaf",focused) }} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeContainer:{
    width:"100%",
    flex:1,
    justifyContent:"center",
    alignContent:"center"
  },
  gradient: {
    width:"100%",
    alignItems: "center",
    paddingTop: 60,
    paddingLeft: 1,
    paddingRight: 1,
    backgroundColor: constants["bg-primary"],
  },
});
