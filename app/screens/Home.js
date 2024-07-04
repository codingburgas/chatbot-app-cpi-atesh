import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  Text,
  TextInput,
  Modal,
  View,
  Pressable,
  FlatList,
} from "react-native";

import { chatAPI } from "../apis/chatAPI";

const DATA = [
  {
    id: "1",
    title: "Chat with ai",
  },
];

const Item = ({ title }) => {
  return (
    <View style={styles.example}>
      <Text style={styles.chatTitle}>{title}</Text>
      <Pressable style={styles.deleteBtn}></Pressable>
    </View>
  );
};

export default function Home({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState(DATA);
  const [newChatName, setNewChatName] = useState("");
  const [chatIdSelected, setChatIdSelected] = useState();

  const createItem = () => {
    setItems([...items]);
  };
  const handelDelete = () => {};

  const handleNewChat = () => {
    chatAPI
      .createNewChat(newChatName)
      .then((data) => {
        chatAPI.getChatHystory().then((data) => {
          setChatHistory(data.data.reverse());
        });
        createItem();
        navigation.navigate("ChatRoom")
      })
      .catch((err) => {
        console.log(err);
      });

    setNewChatName("");
    setModalVisible(false);
  };
  useEffect(() => {
    chatAPI.getChat(chatIdSelected).then((data) => {
      setSelectedChat(data.data);
    });
  }, [chatIdSelected]);

  return (
    <LinearGradient colors={["#BDC0C6", "#7678ED"]} style={styles.screen}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalScreen}>
          <View style={styles.boxCreateChat}>
            <Text style={styles.infoBox}>Let's create Room!</Text>
            <TextInput
              placeholder="Enter a title!"
              placeholderTextColor={"white"}
              style={styles.inputTitle}
              onChangeText={setNewChatName}
            />
            <Pressable
              style={styles.createBtn}
              onPress={() => {
                setModalVisible(!modalVisible);
                handleNewChat();
                
              }}
            >
              <Text style={styles.btnText}>Create Chat!</Text>
            </Pressable>
            <View></View>
          </View>
        </View>
      </Modal>
      <Text style={styles.info}>
        Hello there! I am Atesh let's chat! First create chat and you can find
        me in the room.
      </Text>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.plusSymb}>+</Text>
      </TouchableOpacity>
      <View style={styles.chatContainer}>
        <FlatList
          data={items}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatRooms}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
  },
  info: {
    color: "white",
    fontSize: 30,
    width: 350,
    marginTop: 50,
    textAlign: "center",
  },
  addBtn: {
    backgroundColor: "white",
    borderRadius: 100,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  plusSymb: {
    fontSize: 25,
  },
  inputTitle: {
    margin: 25,
    width: 150,
    height: 40,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 100,
    color: "white",
  },
  modalScreen: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(217, 217, 217,  0.82)",
  },
  boxCreateChat: {
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 200,
    backgroundColor: "white",
    borderRadius: 30,
  },
  createBtn: {
    backgroundColor: "black",
    width: 100,
    height: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "white",
  },
  infoBox: {
    fontSize: 22,
  },
  chatContainer: {
    alignItems: "center",

    height: 500,
    width: 300,
    marginTop: 50,
    backgroundColor: "white",
    borderRadius: 20,
  },
  example: {
    width: 270,
    height: 80,
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  chatTitle: {
    color: "white",
    marginLeft: 10,
    fontSize: 25,
  },
  deleteBtn: {
    height: 40,
    width: 40,
    backgroundColor: "red",
    borderRadius: 5,
    marginRight: 20,
  },
});
