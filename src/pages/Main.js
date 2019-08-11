import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity
} from "react-native";

import logo from "../assets/logo.png";
import dislike from "../assets/dislike.png";
import like from "../assets/like.png";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../services/api";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5"
  },
  logo: {
    marginTop: 30
  },
  cardsContainer: {
    flex: 1,
    maxHeight: 500,
    alignSelf: "stretch",
    justifyContent: "center"
  },
  card: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    marginTop: 30,
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 8,
    overflow: "hidden"
  },
  avatar: {
    flex: 1,
    height: 50
  },
  cardFooter: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#ffffff"
  },
  devName: {
    fontSize: 16,
    color: "#333333",
    fontWeight: "bold"
  },
  bio: {
    marginTop: 5,
    fontSize: 14,
    color: "#999999",
    lineHeight: 18
  },
  buttonsContainer: {
    marginVertical: 30,
    flexDirection: "row",
    justifyContent: "center"
  },
  button: {
    width: 50,
    height: 50,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 25,
    elevation: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    textShadowOffset: {
      width: 0,
      height: 2
    }
  },
  empty: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 24,
    color: "#999999",
    fontWeight: "bold"
  }
});

export default function Main({ navigation }) {
  const userId = navigation.getParam("userId");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await api.get("/devs?filtered=true", {
        headers: {
          user: userId
        }
      });

      setUsers(response.data);
    };

    getUsers();
  }, [userId]);

  async function handleDislike() {
    const [user, ...others] = users;
    await api.post(`/devs/${user._id}/dislikes`, null, {
      headers: { user: userId }
    });

    setUsers(others);
  }

  async function handleLike() {
    const [user, ...others] = users;

    await api.post(`/devs/${user._id}/likes`, null, {
      headers: { user: userId }
    });

    setUsers(others);
  }

  async function handleLogout() {
    await AsyncStorage.clear();

    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Image style={styles.logo} source={logo} />
      </TouchableOpacity>
      <View style={styles.cardsContainer}>
        {!users.length ? (
          <Text style={styles.empty}>
            Não há mais desenvolvedores cadastrados que ainda não tenha
            interagido
          </Text>
        ) : (
          users.map((user, index) => (
            <View
              key={user._id}
              style={[styles.card, { zIndex: users.length - index }]}
            >
              <Image style={styles.avatar} source={{ uri: user.avatar }} />
              <View style={styles.cardFooter}>
                <Text style={styles.devName}>{user.name}</Text>
                <Text numberOfLines={3} style={styles.bio}>
                  {user.bio ? user.bio : "Bio ainda não preenchida"}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>
      {users.length > 0 && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handleDislike} style={styles.button}>
            <Image source={dislike} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLike} style={styles.button}>
            <Image source={like} />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
