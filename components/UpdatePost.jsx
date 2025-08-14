import { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { db } from "../FirebaseConfig";
import { collection, updateDoc, doc } from "firebase/firestore";
import { AppStyles } from "../styles/AppStyles";

export default function UpdatePost() {
  const [postId, setPostId] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const updateDocument = async () => {
    console.log("Updating document to Firestore...", postId);
    if (!postId || !title || !message) {
      console.error("Post ID, title, and message cannot be empty");
      return;
    }
    try {
      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, {
        title: title,
        message: message,
      });
      console.log("Document updated successfully");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <View style={AppStyles.card}>
      <Text style={AppStyles.title}>Update post:</Text>
      <TextInput placeholder="Post ID" value={postId} onChangeText={setPostId} />
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Message" multiline value={message} onChangeText={setMessage} />
      <Button title="Submit" onPress={updateDocument} />
    </View>
  );
}
