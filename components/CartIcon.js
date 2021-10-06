import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CartContext } from "../CartContext";
export function CartIcon({ navigation }) {
  const { getItemsCount } = useContext(CartContext);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate("Cart");
      }}
    >
      <View style={styles.container}>
        <Ionicons name="ios-cart-outline" size={24} color="grey" />
        <Text style={styles.text}>{getItemsCount()}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    color: "orange",
    fontWeight: "bold",
    position: "relative",
    top: -14,
    right: 15,
  },
});
