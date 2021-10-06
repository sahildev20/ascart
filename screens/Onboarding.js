import React from "react";
import { useRef, useState,useEffect } from "react";
import {
  FlatList,
  View,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import firebase from "../firebase.js";






const slides = [
  { id: "1", title: "First Bear!", image:"https://firebasestorage.googleapis.com/v0/b/test-2382e.appspot.com/o/images%2Fgreen.png?alt=media&token=951d26ba-002d-4990-a538-2a3aa05dfbac"},
  { id: "2", title: "Second Anaconda!", image: "https://firebasestorage.googleapis.com/v0/b/test-2382e.appspot.com/o/images%2Fgreen.png?alt=media&token=951d26ba-002d-4990-a538-2a3aa05dfbac" },
  { id: "3", title: "Third Delhi!", image: "https://firebasestorage.googleapis.com/v0/b/test-2382e.appspot.com/o/images%2Fgreen.png?alt=media&token=951d26ba-002d-4990-a538-2a3aa05dfbac" },
];

const OnItem = ({ item }) => {
  const { height, width } = useWindowDimensions();

  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", height: "100%" }}
    >
      <Image
        source={{uri: item.image}}
        style={{
          height: 500,
          width: width,
          resizeMode: "contain",
        }}
      />
      <View style={{}}>
        <Text style={{ textAlign: "center", color: "grey", fontWeight: "800" }}>
          {item.title}
        </Text>
      </View>
    </View>
  );
};
export default function Onboarding() {
  const { height, width } = useWindowDimensions();

  const [board, setBoard] = useState(null);

  useEffect(() => {
    const fetchOnboard= async()=>{
      try {
        const onboarddata=[]
        await firebase.firestore().collection('onboarding').get().then((querySnapshot)=>{
          // console.log('total onboard',querySnapshot.size);
          querySnapshot.forEach(doc => {
            const {id, title, image} = doc.data();
            onboarddata.push({
              id,
              title,
              image,
            })
          })
        })

        setBoard(onboarddata);
        
      } catch (e) {
        console.log(e);
      }
    }
    fetchOnboard();
  
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ height: height * 0.8 }}>
        <FlatList
          data={board}
          renderItem={({ item }) => <OnItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          scrollEventThrottle={32}
        />
      </View>

      <TouchableOpacity
        style={[
          {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 20,
            borderRadius: 8,
            position: "absolute",
            bottom: 0,
            marginBottom: 20,
            backgroundColor: "orange",
          },
          { width },
        ]}
      >
        <Text
          style={{
            width: "80%",
            textAlign: "center",
            color: "grey",
            fontSize: "32",
            fontWeight: "800",
          }}
        >
          Get Started
        </Text>
        <MaterialIcons name="keyboard-arrow-right" size={34} color="grey" />
      </TouchableOpacity>
    </View>
  );
}
