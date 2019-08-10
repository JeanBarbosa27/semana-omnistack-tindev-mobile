import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Login = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7159c1"
  },
  text: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold"
  }
});

export default Login;
