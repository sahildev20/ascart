import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, FlatList,useWindowDimensions, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const buttons = [
    { id: "1", title: "Profile", icon:'ios-person-circle-outline',screen:"Profile"    },
    { id: "2", title: "Contact Us", icon: 'mail-open-outline',screen:"ContactUs"  },
    { id: "3", title: "About Us", icon:'md-information-circle-outline',screen:"AboutUs" },
  ];

const Button=({item,navigation})=>{
    return(
       <View>
           <TouchableOpacity style={styles.Button}
           onPress={() => {
            navigation.navigate('Profile')}}
           >
        <View style={styles.leftofButton}>
            {console.log(item.title)}
          <Ionicons name={item.icon} size={24} color="black" />
          <Text style={styles.buttonText}>{item.title}</Text>
        </View>
        <View>
          <Image
            style={styles.iconRight}
            source={require("../assets/icons/right-arrow.png")}
          />
        </View>
      </TouchableOpacity>
       </View> 
    )

}
export default function Settings({navigation}) {
    
  return (
    <View style={styles.container}>
      {buttons.map((item)=>
      <Button navigation={navigation} key={item.id} item={item} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
  },
  Button: {
    borderRadius: 6,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    backgroundColor: "#ffffff",
    marginBottom: 10,
  },
  leftofButton: {
    flexDirection: "row",

    alignItems: "center",
  },
  buttonText: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: "300",
  },
  iconLeft: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  iconRight: {
    width: 10,
    height: 10,
    resizeMode: "contain",
  },
});
