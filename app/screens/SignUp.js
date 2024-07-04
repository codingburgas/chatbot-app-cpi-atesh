import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  StatusBar,
  Text,
  TextInput,
} from "react-native";
import { userAPI } from "../apis/userAPI";

export default function SignUp({ navigation }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    const data = {
      username: username,
      password: password,
    };

    userAPI.signUp(data).then(() => {
      navigation.navigate("SignIn");
    }).catch((err) => {
      console.log(err)
    });
  };

  const checkIsEmptyTextInput = () => {
    if (!username.trim()) {
      alert("Please enter your username!");
      return;
    }
    if (!password.trim()) {
      alert("Please enter your password!");
      return;
    }
    handleSignUp();
  };

  return (
    <LinearGradient colors={["#BDC0C6", "#7678ED"]} style={styles.screen}>
      <Text style={styles.regText}>Let's Sign Up!</Text>
      <View style={styles.info}>
        <Text style={styles.logQuest}>Already have an account?</Text>
        <Text
          style={styles.logText}
          onPress={() => navigation.navigate("SignIn")}
        >
          SignIn!
        </Text>
      </View>
      
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
      <TouchableOpacity
        style={styles.signupButton}
        onPress={checkIsEmptyTextInput}
      >
        <Text style={styles.sigUpText}>Sign up!</Text>
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
    color: "white",
  },
  logText: {
    color: "#8148CD",
    marginLeft: 10,
    fontSize:20
  },
  logQuest: {
    fontSize: 20,
    color: "white",
  },
  signupButton: {
    backgroundColor: "#2F1D4D",
    width: 130,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  sigUpText: {
    color: "#C7ACEF",
  },
  info:{
    flexDirection:"row",
    alignItems:"center"
  }
});
