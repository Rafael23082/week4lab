import { useBatteryLevel, useBatteryState, useLowPowerMode } from 'expo-battery';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const batteryLevel = useBatteryLevel();
  const calculatedBatteryLevel = (batteryLevel * 100).toFixed(2);
  const batteryState = useBatteryState();
  const [batteryStateString, setBatteryStateString] = useState("");
  const lowPowerMode = useLowPowerMode();

  useEffect(() => {
    if (batteryState == 0){
      setBatteryStateString("Unknown");
    }else if(batteryState == 1){
      setBatteryStateString("Unplugged");
    }else if(batteryState == 2){
      setBatteryStateString("Charging");
    }else{
      setBatteryStateString("Full");
    }
  }, [batteryState])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Battery Level: {calculatedBatteryLevel}%</Text>
      <Text style={styles.text}>Battery State: {batteryStateString}</Text>
      <Text style={styles.text}>Low Power Mode: {lowPowerMode ? "On": "Off"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    textAlign: "center",
    fontSize: 40,
    paddingVertical: 10
  }
});
