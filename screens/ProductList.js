import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  FlatList,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import firebase from "../firebase.js";
import AppLoading from "../components/AppLoading";
import { ProCard } from "../components/Cards.js";
//Main Function for Scree
export default function ProductList({ route, navigation }) {
  const { width, height } = useWindowDimensions();

  const { id, title } = route.params; //Use the data passsed by previous screen
  const [data, setData] = useState([]);
  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetch("https://fakestoreapi.com/products")
          .then((res) => res.json())
          .then((json) => setData(json))
          .then(() => setAppLoaded(true));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  function Heading({ title }) {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          paddingHorizontal: 40,
          margin: 10,
          borderRadius: 50,
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins_Medium",
            textTransform: "uppercase",
            fontSize: 20,
            color: "#000",
          }}
        >
          {title}
        </Text>
      </View>
    );
  }

  return !appLoaded ? (
    <AppLoading size={100} />
  ) : (
    <View
      style={{
        flex: 1,
        alignItems: "flex-start",
        backgroundColor: "rgb(240,248,255,.7)",
      }}
    >
      <View style={[styles.container, { width: width, height: height }]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          decelerationRate="fast"
          ListHeaderComponentStyle={{
            width: width,
            alignItems: "flex-start",
          }}
          ListHeaderComponent={() => <Heading title={title} />}
          data={data}
          key="#"
          contentContainerStyle={{
            alignItems: "center",
            paddingBottom: height * 0.2,
          }}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProCard item={item} />}
          scrollEventThrottle={32}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
