import React, { useEffect, useState, useContext } from "react";
import firebase from "../firebase.js";
import { Rating } from "../components/Cards.js";
import { FontAwesome5 } from "@expo/vector-icons";

import {
  Text,
  Image,
  View,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { CartContext } from "../CartContext";
export function ProductDetails({ route, navigation }) {
  //constants used in whole screen
  const { width, height } = useWindowDimensions();
  const { id } = route.params;
  const [product, setProduct] = useState({});
  const { addItemToCart } = useContext(CartContext);
  const [appLoaded, setAppLoaded] = useState(false);
  const [item, setItem] = useState({});
  const pid = "p6";

  useEffect(() => {
    const subscriber = firebase
      .firestore()
      .collection("products")
      .doc(pid)
      .onSnapshot((product) => {
        setProduct(product.data());
        setItem(product.data());
        setAppLoaded(true);
      });
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [pid]);
  function onAddToCart() {
    alert("Added Succesfully");
  }

  return (
    <ScrollView
      bounces={false}
      style={{
        width: width,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          width: width - width * 0.1,
          alignItems: "center",
          paddingVertical: 20,
        }}
      >
        <Image
          style={{
            width: width * 0.8,
            height: height * 0.3,
            resizeMode: "contain",
          }}
          source={{ uri: item.image }}
        />
      </View>
      <View>
        <Text
          style={{
            marginTop: 40,
            fontFamily: "Poppins_Regular",
            fontSize: 17,
          }}
        >
          {item.title}
        </Text>
        <View
          style={{
            backgroundColor: "#000",
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
            marginTop: 20,
            elevation: 2,
            flexDirection: "row",
            width: 130,
          }}
        >
          <FontAwesome5 name="rupee-sign" size={15} color="white" />
          <Text
            style={{
              color: "#fff",
              fontFamily: "Poppins_Bold",
              fontSize: 15,
              marginLeft: 5,
              position: "relative",
              bottom: -2,
            }}
          >
            {item.price}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <Rating size={28} rating={item.rating} />
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins_Bold",
              position: "relative",
              bottom: -8,
              marginLeft: 20,
            }}
          >
            {item.views}+
          </Text>
        </View>
      </View>
      {/* Add to CArt button and buy now button */}
      <View
        style={{
          borderRadius: 10,
          width: "100%",
          marginVertical: 30,
        }}
      >
        <TouchableWithoutFeedback onPress={onAddToCart}>
          <Text
            style={{
              padding: 10,
              fontSize: 20,
              elevation: 2,
              fontFamily: "Poppins_Bold",
              backgroundColor: "orange",
              borderRadius: 50,
              marginVertical: 20,
              textAlign: "center",
            }}
          >
            Add to Cart
          </Text>
        </TouchableWithoutFeedback>
      </View>
      {/* Discription container */}
      <Text
        style={{
          fontFamily: "Poppins_Regular",
          textAlign: "left",
          letterSpacing: 1,
          paddingBottom: height * 0.2,
        }}
      >
        {item.discription}
        {item.discription}
      </Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({});
