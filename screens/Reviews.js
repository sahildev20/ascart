import React, { useEffect, useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
} from "react-native";
const { width, height } = Dimensions.get("screen");
// import faker from "faker";
var faker = require('faker');
faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.datatype.uuid(),
    image:faker.image.avatar(),
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});
const BGImage =
  "https://images.pexels.com/photos/1784578/pexels-photo-1784578.jpeg?cs=srgb&dl=pexels-zetong-li-1784578.jpg&fm=jpg";
const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE= AVATAR_SIZE+ SPACING*3;


export default function Reviews() {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={{flex:1}}>
      
        <Image 
        source={{uri:BGImage}}
        style={StyleSheet.absoluteFillObject}
        blurRadius={80}
        />
      <StatusBar  />
      <Animated.FlatList
        contentContainerStyle={{padding:SPACING}}
        data={DATA}
        onScroll={Animated.event(
            [{nativeEvent:{contentOffset:{y:scrollY}}}],
            {useNativeDriver:true}
        )}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => {
            const inputRange=[
                -1,
                0,
                ITEM_SIZE *index,
                ITEM_SIZE*(index+2)
            ]
            const opacityInputRange=[
                -1,
                0,
                ITEM_SIZE *index,
                ITEM_SIZE*(index+1)
            ]
            const scale = scrollY.interpolate({
                inputRange,
                outputRange:[1, 1, 1, 0]
            })
            const opacity = scrollY.interpolate({
                inputRange: opacityInputRange,
                outputRange:[1, 1, 1, 0]
            })
            return(
            <Animated.View style={{ flexDirection: "row" , padding:SPACING,marginBottom:SPACING, borderRadius:12,backgroundColor:'rgba(255, 255 ,255 ,0.9)',
            shadowColor:"#000",
            shadowOffset:{
                width:0,
                height:3
            },
            shadowOpacity:.2,
            shadowRadius:20,
            opacity,
            transform:[{scale}]
            }}>
              <Image
                source={{ uri: item.image }}
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE,
                  marginRight: SPACING / 2,
                }}
              />
              <View>
                <Text style={{ fontSize: 18,fontWeight:"bold"}}>{item.name}</Text>
                <Text style={{ fontSize: 15, opacity: .7}}>{item.jobTitle}</Text>
                <Text style={{ fontSize: 12, opacity: .9,color:'#0099cc' }}>{item.email}</Text>
              </View>
            </Animated.View>
            )
        }}
      />
    </View>
  );


}
