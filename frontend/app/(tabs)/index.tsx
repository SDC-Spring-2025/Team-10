import { Text, View, StyleSheet} from "react-native";
import Button from "@/components/Button";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to your receipt scanner.</Text>
      <View style={styles.footerContainer}>
        <Button label="Take a photo."/>
        <Button label="Choose a photo from library"/>
      </View>
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
  },
  footerContainer: {
    flex: 1 / 20,
    alignItems: 'center'
  },
})
