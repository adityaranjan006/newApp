import { SafeAreaView, StyleSheet, View, ActivityIndicator, Text } from "react-native";
import LFTRFT from "./dashboard";
import { constants } from "../../constants/CONSTANTS";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { useOverlay } from "../../common/hooks/useOverlay";
import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: constants["bg-primary"],
  },
  gradient: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingBottom: 50,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: constants["bg-primary"],
    height: heightPercentageToDP("100%"),
  },
  spinnerContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -80 }],
    alignItems: 'center',
  },
  spinnerText: {
    marginTop: 20, 
    fontSize: 18, 
    fontWeight: "600", 
    color: constants["text-primary-active-color"], 
  },
});

export function Home() {
  const {isOverlayVisible} = useOverlay();
  return (
    <SafeAreaView style={styles.container}>
      {isOverlayVisible && (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size={constants["overlay-size"]} color={constants["text-primary-active-color"]} />
          <Text style={styles.spinnerText}>
            Priming Hub...
          </Text>
        </View>
      )}
        <View style={{ height: heightPercentageToDP("100%"), top: "10%" }}>
          <View style={[styles.gradient, { opacity:isOverlayVisible ? 0.5 : 1 }]}>
            <LFTRFT/>
          </View>
        </View>
    </SafeAreaView>
  );
}
