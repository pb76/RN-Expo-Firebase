import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import ReadPosts from "./components/ReadPosts";
import { AppStyles } from "./styles/AppStyles";

export default function App() {
  return (
    <View style={AppStyles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <ReadPosts />
      <StatusBar style="auto" />
    </View>
  );
}
