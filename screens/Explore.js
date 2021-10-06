import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { CatCard } from "../components/Cards";
import firebase from "../firebase.js";

export default function Explore() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchcat = async () => {
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

        setData(odata);
      } catch (e) {
        console.log(e);
      }
    };
    fetchcat();
  }, []);
  function Item({ item }) {
    return (
      <View>
        <Text>{item.title}</Text>
      </View>
    );
  }
  return (
    <View
      style={{
        backgroundColor: "#ffffff",
      }}
    >
      <FlatList
        contentContainerStyle={{ marginLeft: 10 }}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Item item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
