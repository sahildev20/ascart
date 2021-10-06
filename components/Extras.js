import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");

export function Logo() {
  return (
    <Image
      source={require("../assets/logo/logo1.png")}
      style={{ width: 100, height: 30 }}
    />
  );
}
export function SearchIcon({ navigation }) {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("Search")}>
      <Ionicons name="md-search" size={24} color="orange" />
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({});
