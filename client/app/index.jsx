import { Image } from "expo-image";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.heading}>
        Edit app/index.tsx to edit this screen. Ilham Ganteng
      </Text>

      <Link href={"/about"} style={{ color: "red" }} >About</Link>

      <View>
        <Text>
          Hello
        </Text>
      </View>
      
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "orange"
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white"
  }
});