import React, { useState, useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");
export function Rating({ rating, size }) {
  const list = [];
  for (let i = 0; i < rating; i++) {
    list.push("$");
  }

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {list.map(({ item }, index) => {
        return <Ionicons key={index} name="star" size={size} color="orange" />;
      })}
    </View>
  );
}

function CatCard({ item }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ProductList", { title: item.title, id: item.id })
      }
      style={[
        styles.card,
        styles.cat,
        { height: 180, marginRight: 10, marginVertical: 10 },
      ]}
    >
      <Image style={styles.image} source={{ uri: item.image }} />
      <Image
        style={styles.iconRight}
        source={require("../assets/icons/right-arrow.png")}
      />
      <Text
        style={{
          fontSize: 11,
          fontWeight: "500",
          fontFamily: "Poppins_Regular",
        }}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );
}

const ProCard = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
      style={[
        styles.card,
        styles.product,
        {
          height: height / 3,
          width: width * 0.48,
          marginBottom: 4,
          marginHorizontal: 2,
        },
      ]}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          paddingVertical: 4,
          width: "100%",
        }}
      >
        <Text
          style={{ fontSize: 12, color: "green", fontFamily: "Poppins_Black" }}
        >
          Featured
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image style={styles.productimage} source={{ uri: item.image }} />
      </View>
      <View style={{ width: "100%" }}>
        <Text
          style={{
            fontSize: 12,
            marginBottom: 4,
            fontFamily: "Poppins_Regular",
          }}
        >
          {item.title.slice(0, 30)} ...
        </Text>
        <Text
          style={{
            fontWeight: "700",
            fontSize: 10,
            marginBottom: 4,
            fontFamily: "Poppins_Black",
          }}
        >
          ₹ {item.price}
        </Text>
        <Rating size={15} rating={4} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderColor: "grey",
    backgroundColor: "#fff",

    borderRadius: 8,
    padding: 20,
    alignItems: "center",
  },

  cat: { justifyContent: "space-between", borderWidth: 0.5 },
  product: { borderWidth: 0.3 },
  image: { width: 100, height: 100, resizeMode: "contain" },
  productimage: { width: 100, height: 150, resizeMode: "contain" },

  title: {
    position: "relative",
    bottom: 10,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 18,
  },
  iconRight: { width: 10, height: 10, resizeMode: "contain" },
  productsContainer: { padding: 20, borderTopWidth: 0.5, borderColor: "grey" },
  boldText: { fontSize: 18, fontWeight: "700" },
  boldText: { fontWeight: "800", fontSize: 20, textAlign: "left" },
});

export { CatCard, ProCard };
