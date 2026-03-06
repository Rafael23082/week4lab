import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const LOCATION_TASK_NAME = "background-location-task";

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.log("Task error:", error);
    return;
  }

  if (data) {
    const { locations } = data as any;

    const latitude = locations[0].coords.latitude;
    const longitude = locations[0].coords.longitude;

    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);
  }
});

export default function HomeScreen() {

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const startLocationTracking = async () => {

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log("Foreground permission denied");
      return;
    }

    const bgStatus = await Location.requestBackgroundPermissionsAsync();
    if (bgStatus.status !== 'granted') {
      console.log("Background permission denied");
      return;
    }

    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.High,
      timeInterval: 5000,
      distanceInterval: 1,
    });

    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 1,
      },
      (location) => {
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
      }
    );

    console.log("Background location tracking started");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Background Location Tracker</Text>

      <Text>Latitude: {latitude ?? "Waiting..."}</Text>
      <Text>Longitude: {longitude ?? "Waiting..."}</Text>

      <Button
        title="Start Tracking Location"
        onPress={startLocationTracking}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },

  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});