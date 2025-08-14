import { useEffect, useState } from "react";
import { Button, Text, TextInput, View, TouchableOpacity, FlatList } from "react-native";
import { db } from "../FirebaseConfig";
import { collection, updateDoc, doc, getDocs, query, orderBy } from "firebase/firestore";
import { AppStyles } from "../styles/AppStyles";

export default function UpdatePost() {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState("");
  const [selectedPostTitle, setSelectedPostTitle] = useState("Choose a post to update...");
  const [postId, setPostId] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const fetchPosts = async () => {
    console.log("Fetching posts from Firestore...");
    try {
      const postsCol = collection(db, "posts");
      const postsQuery = query(postsCol, orderBy("date", "desc"));
      const postSnapshot = await getDocs(postsQuery);
      const fetchedPosts = postSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostSelection = (post) => {
    setSelectedPostId(post.id);
    setSelectedPostTitle(post.title);
    setPostId(post.id);
    setTitle(post.title || "");
    setMessage(post.message || "");
    setDropdownOpen(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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

      {loading ? (
        <Text>Loading posts...</Text>
      ) : (
        <View style={{ marginBottom: 20 }}>
          <Text style={AppStyles.subtitle}>Select Post:</Text>
          <TouchableOpacity
            onPress={() => setDropdownOpen(!dropdownOpen)}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              padding: 15,
              marginTop: 10,
              backgroundColor: "#fff",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <Text style={{ fontSize: 16, color: selectedPostId ? "#000" : "#999" }}>{selectedPostTitle}</Text>
            <Text style={{ fontSize: 16, color: "#666" }}>{dropdownOpen ? "▲" : "▼"}</Text>
          </TouchableOpacity>

          {dropdownOpen && (
            <View
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderTopWidth: 0,
                borderRadius: 5,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                backgroundColor: "#fff",
                maxHeight: 200,
              }}>
              <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handlePostSelection(item)}
                    style={{
                      padding: 15,
                      borderBottomWidth: 1,
                      borderBottomColor: "#eee",
                    }}>
                    <Text style={{ fontSize: 16 }}>{item.title}</Text>
                    <Text style={{ fontSize: 12, color: "#666", marginTop: 2 }}>ID: {item.id}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>
      )}

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          padding: 10,
          marginBottom: 15,
          fontSize: 16,
        }}
      />
      <TextInput
        placeholder="Message"
        multiline
        value={message}
        onChangeText={setMessage}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          padding: 10,
          marginBottom: 20,
          fontSize: 16,
          minHeight: 80,
        }}
      />
      <Button title="Submit" onPress={updateDocument} disabled={!selectedPostId} />
    </View>
  );
}
