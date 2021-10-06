import React, { useState, useEffect } from "react";
import firebase from "../firebase.js";

import {
  StyleSheet,
  View,
  TextInput,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");
const HEADER_HEIGHT = 70;
// Our Main Function for this screen Search

export default function Search({ navigation }) {
  const [data, setData] = useState([]);
  const [fdata, setFData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [searchText, setSearchText] = useState();
  const [searching, setSearching] = useState(false);

  const fetchFData = async () => {
    try {
      const tempData = [];
      await firebase
        .firestore()
        .collection("categories")
        .get()
        .then((querySnapshot) => {
          // console.log('total onboard',querySnapshot.size);
          querySnapshot.forEach((doc) => {
            const { id, title, type = "category" } = doc.data();
            tempData.push({
              id,
              title,
              type,
            });
          });
        });

      await firebase
        .firestore()
        .collection("products")
        .get()
        .then((querySnapshot) => {
          // console.log('total onboard',querySnapshot.size);
          querySnapshot.forEach((doc) => {
            const { id, title, type = "product" } = doc.data();
            tempData.push({
              id,
              title,
              type,
            });
          });
        });

      setFData(tempData);
    } catch (e) {
      console.log(e);
    }
  };
  const fetchData = () => {
    try {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((json) => setData(json));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchFData();
  }, []);

  const handleOnChangeText = (text) => {
    setSearchText(text);
    let tempData = [];
    if (text != "") {
      data.forEach((item) => {
        if (item.title.toLowerCase().indexOf(text.toLowerCase()) > -1) {
          tempData.push(item);
        }
      });
    }

    setFilteredData(tempData);
  };

  //Sub-Functions
  // Item Function

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: width,
          paddingLeft: 15,
          height: HEADER_HEIGHT,
          backgroundColor: "#fff",
          shadowRadius: 10,
          shadowOffset: { height: 5, width: 5 },
          shadowColor: "black",
          shadowOpacity: 0.5,
          elevation: 10,
        }}
      >
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Ionicons
            style={{ marginRight: 10 }}
            name="md-arrow-back-outline"
            size={28}
            color="black"
          />
        </TouchableWithoutFeedback>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 2,
            borderRadius: 5,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderColor: "orange",
          }}
        >
          <Ionicons
            style={{ marginHorizontal: 8 }}
            name="md-search"
            color="grey"
            size={18}
          />
          <TextInput
            style={{
              color: "grey",
              width: searching ? width * 0.55 : width * 0.7,
            }}
            placeholder="Search products"
            onFocus={() => setSearching(true)}
            value={searchText}
            onChangeText={(text) => handleOnChangeText(text)}
          />
        </View>
        {searching ? (
          <TouchableWithoutFeedback onPress={() => navigation.navigate("Home")}>
            <Text style={{ marginLeft: 10, color: "darkblue" }}>Cancel</Text>
          </TouchableWithoutFeedback>
        ) : null}
      </View>

      {/* Page Content Goes Here */}

      <View style={styles.container}>
        <FlatList
          data={filteredData}
          key="#"
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                width: width,
                backgroundColor: "#fff",
                padding: 20,
                borderBottomWidth: 2,
                borderBottomColor: "grey",
              }}
            >
              <TouchableWithoutFeedback>
                <Text style={{ color: "grey" }}>{item.title}</Text>
              </TouchableWithoutFeedback>
            </View>
          )}
        />
      </View>

      <StatusBar backgroundColor="white" barStyle="dark-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: "#fff",
    alignItems: "center",
    height: height - HEADER_HEIGHT,
  },
});
