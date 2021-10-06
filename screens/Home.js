import React, { useState, useEffect } from "react";
import firebase from "../firebase.js";

import {
  StyleSheet,
  Image,
  Text,
  View,
  StatusBar,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import { useFonts } from "expo-font";
import { CatCard, ProCard } from "../components/Cards";

import { Ionicons } from "@expo/vector-icons";

import AppLoading from "../components/AppLoading";

const { width, height } = Dimensions.get("screen");
const safeheight = height * 0.81;
const imageurl =
  "https://firebasestorage.googleapis.com/v0/b/test-2382e.appspot.com/o/images%2FPicsArt_10-01-08.26.37.jpg?alt=media&token=4f36621d-48d0-4c75-9671-5a12f5f62b13";

export default function Home({ navigation }) {
  const [appLoaded, setAppLoaded] = useState(false);
  const [catData, setCatData] = useState([]);

  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetch("https://fakestoreapi.com/products")
          .then((res) => res.json())
          .then((json) => setProductsData(json))
          .then(() => setAppLoaded(true));
      } catch (error) {
        console.log(error);
      }
      try {
        const odata = [];
        await firebase
          .firestore()
          .collection("categories")
          .get()
          .then((querySnapshot) => {
            // console.log('total onboard',querySnapshot.size);
            querySnapshot.forEach((doc) => {
              const { id, title, image } = doc.data();
              odata.push({
                id,
                title,
                image,
                type: "category",
              });
            });
          });

        setCatData(odata);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const Location = () => {
    return (
      <View
        style={{
          backgroundColor: "red",
          width: width,
          flexDirection: "row",
          alignItems: "center",
          padding: 5,
        }}
      >
        <Ionicons name="location-outline" size={20} color="black" />
        <Text>Location</Text>
      </View>
    );
  };
  function Banner() {
    return (
      <View>
        <Image source={{ uri: imageurl }} style={styles.banner}></Image>
      </View>
    );
  }
  function HorList({ data }) {
    return (
      <View
        style={{
          width: width,
          backgroundColor: "#ffffff",
        }}
      >
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{ marginLeft: 10 }}
          data={catData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CatCard item={item} />}
        />
      </View>
    );
  }

  //fuction for ProductsList with Header
  function ProductsList({ data }) {
    return (
      <View
        style={{
          width: width,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <Text
          style={{
            fontWeight: "800",
            padding: 10,
            fontSize: 20,
            fontFamily: "Poppins_Black",
            ...{ width },
          }}
        >
          PRODUCTS
        </Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {data.map((item) => {
            return (
              <View key={item.id}>
                <ProCard item={item} />
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  return !appLoaded ? (
    <AppLoading size={150} />
  ) : (
    <View style={styles.container}>
      <ScrollView>
        <Location />
        <Banner />
        <HorList data={catData} />
        <ProductsList data={productsData} />
      </ScrollView>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: safeheight,
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    margin: 0,
  },
  fullwidth: {
    width: width,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  listcontainer: {
    width: width,
    alignItems: "center",
    marginBottom: 5,
  },
  banner: { width: width, height: 230, resizeMode: "contain" },
  card: {
    borderColor: "grey",
    backgroundColor: "#fff",
    marginRight: 10,
    marginVertical: 10,
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 20,
    width: width * 0.45,
    height: 200,
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageCat: { width: 100, height: 100, resizeMode: "contain" },
  title: {
    position: "relative",
    bottom: 10,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 18,
  },
  iconRight: { width: 10, height: 10, resizeMode: "contain" },
  productsContainer: { padding: 20, borderTopWidth: 0.5, borderColor: "grey" },
  boldText: { fontWeight: "800", fontSize: 20, textAlign: "left" },
  button: {
    width: width * 0.9,
    height: 30,
    alignItems: "center",
    backgroundColor: "yellow",
    borderRadius: 10,
    justifyContent: "center",
  },
  buttonText: {},
});
