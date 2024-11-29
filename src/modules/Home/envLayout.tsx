import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { constants } from "../../constants/CONSTANTS";
import EnvironmentSensing from "./envSensing";
import RoomScoreSlider from "./roomScore";
import BG from "../../modules/Home/background"


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: constants["bg-primary"],
  },
  roomTextContainer:{
    position: "absolute",
    top: "12%",
    left:"20%",
    alignItems: "center",
    justifyContent: "center",
  }
});

export function Environment() {
  return (
    <SafeAreaView style={styles.container}>
       <BG style={{ position: "absolute" }} color1="#220608" color2="#010103" />
         <ScrollView>
            <View style={{flex:1, justifyContent:"center",alignItems:"center", transform: [{ rotate: "-30deg" }],marginTop:30}}>
                  <RoomScoreSlider
                    thumbColor={ constants["thumb-active-color"]}
                    thumbRadius={6}
                    trackStrokeWidth={10}
                    gestureDisabled={true}
                    trackRadius={140}
                    circleType={"Top"}
                    value={50}
                    onChangeColor={(color) => { }}
                    onValueChange={()=>{}}
                    linearGradient={[
                      { color: "#9E1410", offset: 0 },
                      { color: "#9E1414", offset: 0.25 },
                      { color: "#9E1414", offset: 0.5 },
                      { color: "#9E1414", offset: 0.6 },
                      { color: "#4FA435", offset: 0.75 },
                      { color: "#4FA435", offset: 1 },
                    ]}
                    maxValue={100}
                    minValue={0}
                    paddingVertical={175}
                    trackWidth={16}
                  />
            </View>
       <View style={styles.roomTextContainer}>
          <Text style={{color:"#B3B7B6", fontSize:12, fontWeight:"light"}}>bedroom health</Text>
          <Text style={{color:"#1BAA1B", fontSize:47, fontWeight:"400"}}>97</Text>
          <Text style={{color:"#ffffff", fontSize:15, fontWeight:"bold"}}>optimal</Text>
          <View style={{ width:"65%", flexWrap: 'wrap', alignItems: 'center',marginTop:10 }}>
              <Text style={{color:"#B3B7B6", fontSize:12, fontWeight:"light", textAlign: 'center'}}>your bedroom is in peak health support</Text>
          </View>
       </View>
      <View style={{flex:1, height:"50%"}}>
          <EnvironmentSensing />
      </View>
        </ScrollView>
    </SafeAreaView>
  );
}