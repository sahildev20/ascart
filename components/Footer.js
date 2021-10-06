import React from "react";
import { Text, View, StyleSheet } from "react-native";

function Footer() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        @ Ascart
        <Text style={styles.text}>All Rights Reserved</Text>
      </Text>
    </View>
  );
}

export default Footer;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },

  logo: {
    color: "grey",
    fontSize: 15,
    fontWeight: "bold",
  },

  text: {
    marginLeft: 10,
    color: "black",
    fontSize: 12,
  },
});
