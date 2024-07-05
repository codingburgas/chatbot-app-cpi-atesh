import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import Scratch from "../assets/scratch.png"
import { View, Text, StyleSheet, Platform, StatusBar, TouchableOpacity, Image } from 'react-native'


export default function Welcome({ navigation }) {
  return (
    <LinearGradient
      colors={['#BDC0C6', '#7678ED']}
      style={styles.screen}>
      <View style={styles.infoBox}>
        <Text style={styles.title}>ATESH</Text>
        <Text style={styles.info}>The application helps parents and children who need to find information about our VSCPI high school. For this we provide an interactive way called Atesh. This is a chat bot that answers questions related to high school. The solution is presented in two ways - a web application and a mobile application.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.buttonText}>Get started</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>

  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center"
  },
  infoBox: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-evenly",

  },
  title: {
    color: "#020817",
    fontSize: 60
  },
  info: {
    textAlign: "center",
    color: "white",
    width: 300,
    fontSize: 30
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    marginBottom: 2
  },
  button: {
    alignItems: "center",
    justifyContent:"center",
    width:150,
    height:50,
    backgroundColor:"#0F172A",
    borderRadius:10
  }
});