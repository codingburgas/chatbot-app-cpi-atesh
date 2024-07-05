import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Pressable,
  View,
  StyleSheet,
  StatusBar,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SectionList,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { chatAPI } from "../apis/chatAPI";
import { messagesAPI } from "../apis/mesagesAPI";
import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { userAPI } from "../apis/userAPI";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Item = ({ title, username, author }) => {
  return (
    <View style={styles.example}>
      <View style={styles.image}>
        <Text>
          {author === "AI" ? author : username.substring(0, 2).toUpperCase()}
        </Text>
      </View>
      <View style={styles.message}>
        <Text style={styles.messageText}>{title}</Text>
      </View>
    </View>
  );
};

export default function ChatRoom() {
  const route = useRoute();

  let [chatMessages, setChatMessages] = useState([]);
  let [username, setUserName] = useState("");
  let [message, setMessage] = useState("");

  let id = route.params.id;

  useEffect(() => {
    chatAPI.getChat(id).then((data) => {
      setChatMessages(() => data.data.messages);
    });

    userAPI.getUser().then((data) => {
      setUserName(data.data.username);
    });
  }, []);

  const handleNewMessage = () => {
    if (!message || message === "") {
      return;
    }

    const newMessage = {
      chat_id: id,
      content: message,
      author: "USER",
    };

    messagesAPI.createMessage(newMessage).then(() => {
      chatAPI.getChat(id).then((data) => {
        setChatMessages(data.data.messages);
      });
    });

    setMessage("");
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <LinearGradient colors={["#BDC0C6", "#7678ED"]} style={styles.screen}>
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerInfo}>
            The Version of the app is alpha! Answers can be wrong!{" "}
          </Text>
        </View>
        <View style={styles.messagesContainer}>
          <FlatList
            data={chatMessages}
            renderItem={({ item }) => (
              <Item
                title={item.content}
                username={username}
                author={item.author}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={styles.inputField}>
          <TextInput
            style={styles.inputMesage}
            placeholder="Enter text!"
            placeholderTextColor={"black"}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleNewMessage}>
            <Icon name="send" size={26} color="#C269C3" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
    justifyContent: "center",
  },

  inputField: {
    flexDirection: "row",
    bottom: 30,
    alignItems: "center",
  },
  inputMesage: {
    backgroundColor: "white",
    width: 290,
    height: 70,
    borderRadius: 10,
    fontSize: 20,
  },
  sendBtn: {
    width: 50,
    height: 50,
    backgroundColor: "#313338",
    marginLeft: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  chats: {
    height: 670,
    width: 350,
    marginTop: 20,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 20,
  },
  example: {
    flexDirection: "row",
    alignItems: "center",
    width: 300,
    height: 50,
    marginTop: 20,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 100,
    backgroundColor: "rgba(217, 217, 217,  0.82)",
    justifyContent: "center",
    alignItems: "center",
  },
  messageText: {
    color: "black",
    fontSize: 18,
    marginLeft: 10,
    marginBottom: 10,
  },
  message: {
    backgroundColor: "rgba(217, 217, 217,  0.82)",
    marginLeft: 10,
    height: 50,
    width: 230,
    borderRadius: 10,
    flex: 1,
  },
  messagesContainer: {
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 20,

    width: 350,
    marginBottom: 50,
    flex: 1, // Added to take up available space
    paddingBottom: 10, 
  },
  container: {
    flex: 1,
  },
  disclaimer: {
    width: 350,
    height: 60,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  disclaimerInfo: {
    fontSize: 18,
    textAlign: "center",
  },
});
