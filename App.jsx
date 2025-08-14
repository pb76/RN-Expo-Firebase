import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { AppStyles } from "./styles/AppStyles";
import ReadPosts from "./components/ReadPosts";
import AddPost from "./components/AddPost";

export default function App() {
  return (
    <View style={AppStyles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <AddPost />
      <ReadPosts />
      <StatusBar style="auto" />
    </View>
  );
}
