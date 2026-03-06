import { StyleSheet, Text, useColorScheme, View } from "react-native";

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Text style={[colorScheme === 'light' ? styles.lightThemeText: styles.darkThemeText, styles.body]}>This application adapts to dark or light themes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  lightThemeText: {
    color: "black"
  },
  darkThemeText: {
    color: "white"
  },
  body: {
    textAlign: "center",
    fontSize: 25
  }
});
