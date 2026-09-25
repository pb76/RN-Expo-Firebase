import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import { AppStyles } from "./styles/AppStyles";
import ReadPosts from "./components/ReadPosts";
import AddPost from "./components/AddPost";
import DeletePost from "./components/DeletePost";
import UpdatePost from "./components/UpdatePost";

export default function App() {
  return (
    <ScrollView style={AppStyles.container} contentContainerStyle={AppStyles.containerContent}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <AddPost />
      {/* <ReadPosts /> */}
      <UpdatePost />
      <DeletePost />
      <StatusBar style="auto" />
    </ScrollView>
  );
}
