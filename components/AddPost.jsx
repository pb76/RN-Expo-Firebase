import { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { db } from "../FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { AppStyles } from "../styles/AppStyles";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const postDoc = async () => {
    console.log("Posting document to Firestore...");
    if (!title || !message) {
      console.error("Title and message cannot be empty");
      return;
    }
    try {
      const date = new Date().toISOString();
      const postsCol = collection(db, "posts");
      const docRef = await addDoc(postsCol, {
        title: title,
        message: message,
        date: date,
        user: "Anonymous",
      });
    } catch (error) {
      console.error("Error posting document: ", error);
    }
  };

  return (
    <View style={AppStyles.card}>
      <Text style={AppStyles.title}>Add a new post:</Text>
      <TextInput placeholder="Title" style={AppStyles.input} value={title} onChangeText={setTitle} />
      <TextInput placeholder="Message" style={AppStyles.input} multiline value={message} onChangeText={setMessage} />
      <Button title="Submit" onPress={postDoc} />
    </View>
  );
}
