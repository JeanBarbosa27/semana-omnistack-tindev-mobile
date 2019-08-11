import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Platform
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import api from "../services/api";

import logo from "../assets/logo.png";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5"
  },
  input: {
    height: 46,
    marginTop: 20,
    paddingHorizontal: 15,
    alignSelf: "stretch",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 4
  },
  button: {
    height: 46,
    marginTop: 10,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DF4723",
    borderRadius: 4
  },
  buttonText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "bold"
  }
});

export default function Login({ navigation }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("userId").then(userId => {
      if (userId) {
        navigation.navigate("Main", { userId });
      }
    });
  }, []);

  async function handelLogin() {
    const response = await api.post("/devs", {
      username: user
    });

    const { _id } = response.data;

    await AsyncStorage.setItem("userId", _id);
    navigation.navigate("Main", { _id });
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={Platform.OS === "ios"}
      style={styles.container}
    >
      <Image source={logo} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Digite o seu usuário no Github"
        placeholderTextColor="#999999"
        style={styles.input}
        value={user}
        onChangeText={setUser}
      />
      <TouchableOpacity onPress={handelLogin} style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
