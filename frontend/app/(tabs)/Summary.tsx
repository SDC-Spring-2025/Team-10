import React from "react";
import { Text, View, StyleSheet} from "react-native";

export default function Summary() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Summary</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2E8B57",
  },
  text: {
    color: "white"
  }
})
