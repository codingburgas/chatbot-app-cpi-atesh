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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { chatAPI } from "../apis/chatAPI";

const Item = ({ title, onpress, handleDeleteChat, isSelected, ondelete }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        //isSelected ? styles.selected : styles.unselected,
      ]}
      onPress={onpress}
    >
      <View style={styles.iconContainer}>
        <Icon name="message-text-outline" size={24} color="#333" />
      </View>
      <Text style={styles.chatTitle}>{title}</Text>

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={ondelete}
      ><Icon name="delete" size={24} color="#C269C3" /></TouchableOpacity>
    </TouchableOpacity>
  );
};

export default function Home({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [newChatName, setNewChatName] = useState("");
  const [chatIdSelected, setChatIdSelected] = useState();

  useEffect(() => {
    chatAPI.getChatHystory().then((data) => {
      setChatHistory(data.data.reverse())
    })
  }, [])

  const handleNewChat = () => {
    chatAPI
      .createNewChat(newChatName)
      .then((data) => {
        chatAPI.getChatHystory().then((data2) => {
          setChatHistory(data2.data.reverse());
        });
        
        navigation.navigate("ChatRoom", {id: data.data.id});
      })

      .catch((err) => {
        console.log(err);
      });

    setModalVisible(false);
  };

  const handleDeleteChat = (id) => {
    chatAPI.deleteChat(id).then(() => {
      chatAPI.getChatHystory().then((data) => {
        setChatHistory(data.data.reverse());

        if (chatIdSelected === id) {
          setChatIdSelected(undefined);
          setSelectedChat(undefined);
        }
      });
    });
  };

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
              placeholderTextColor={"#3D219F"}
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
        <Icon name="plus" size={26} color="black" />
      </TouchableOpacity>
      <View style={styles.chatContainer}>
        <FlatList
          data={chatHistory}
          renderItem={({ item }) => (
            <Item
            key={item.id}
            ondelete={() => handleDeleteChat(item.id)}
            onpress={() => {setChatIdSelected(item.id); navigation.navigate("ChatRoom", {id: item.id})}}
            title={item.name}
            selected={item.id === chatIdSelected}
          />
          )}
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
    backgroundColor: "white",
    padding: 10,
    borderRadius: 100,

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
    backgroundColor: "#B0B8FF",
    borderRadius: 30,
  },
  createBtn: {
    backgroundColor: "white",
    width: 100,
    height: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#3D219F",
  },
  infoBox: {
    fontSize: 22,
    color:"#3D219F"
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

  deleteBtn: {
    height: 40,
    width: 40,
    backgroundColor: "#313338",
    borderRadius: 5,
    marginRight: 10,
    justifyContent:"center",
    alignItems:"center"
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#eee",
    marginTop: 10,
    width: 250,
  },
  selected: {
    backgroundColor: "#eee", // Set background color for selected state
  },
  unselected: {
    backgroundColor: "#fff",
  },
  iconContainer: {
    marginRight: 16,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    color: "black", // Allow title to expand
  },
  deleteButton: {
    marginLeft: 16, // Adjust spacing for delete button
  },
  cardStyle: {
    margin: 10,
    padding: 10,
    width: 300,
    marginTop: 30,
  },
  infoCards: {
    fontSize: 20,
  },
});
