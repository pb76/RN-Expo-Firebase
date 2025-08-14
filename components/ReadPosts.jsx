import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { db } from "../FirebaseConfig";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { AppStyles } from "../styles/AppStyles";

export default function ReadPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDocs = async () => {
    console.log("Fetching documents from Firestore...");
    try {
      const postsCol = collection(db, "posts");
      const postsQuery = query(postsCol, orderBy("date", "desc"));
      const postSnapshot = await getDocs(postsQuery);
      const posts = postSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log("Posts :", posts);
      setPosts(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return (
    <View style={AppStyles.card}>
      <Text style={AppStyles.title}>Posts:</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        posts.map((post) => (
          <View key={post.id}>
            <Text style={AppStyles.subtitle}>{post.title}</Text>
            <Text>{post.message}</Text>
          </View>
        ))
      )}
      <Button title="Refresh" onPress={fetchDocs} />
    </View>
  );
}
