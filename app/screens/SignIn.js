import React, {useState} from "react";

import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  Text,
  TextInput
} from "react-native";
import { userAPI } from "../apis/userAPI";

export default function SignIn({ navigation }) {
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const handleSignIn = () => {

    const data = {
      username: username,
      password: password
  }

    userAPI.signIn(data)
    navigation.navigate("Home")
  }

  const checkIsEmptyTextInput  = () =>{
    if(!username.trim()){
        alert("Please enter your nqma!")
        return
    }
    if(!password.trim()){
      alert("Please enter your password!")
      return
    }
    handleSignIn()
  }

  return (
    <LinearGradient colors={['#BDC0C6', '#7678ED']} style={styles.screen}>

      <Text style={styles.regText}>Let's Sign In!</Text>
      <TextInput
        placeholder="Username"
        placeholderTextColor={"#281D3A"}
        style={styles.inputs}
        onChangeText={setUserName}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={"#281D3A"}
        style={styles.inputs}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.signinButton} onPress={checkIsEmptyTextInput}>
        <Text style={styles.signText}>Sign in!</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
    justifyContent: "center",
  },
  inputs: {
    margin: 25,
    width: 270,
    height: 40,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 100,
  },
  regText: {
    fontSize: 40,
    color: "white"
  },
  logText: {
    color: "blue",
  },
  logQuest: {
    fontSize: 20,
  },
  signinButton: {
    backgroundColor: "#2F1D4D",
    width: 130,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    
  },
  signText:{
    color:"#C7ACEF"
  }
});
