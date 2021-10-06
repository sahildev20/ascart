import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
const { width, height } = Dimensions.get("screen");
const ITEM_SIZE = width * 0.9;
export default function Banner({ data }) {
  return (
    <View style={{ width: width }}>
      <ScrollView
        horizontal
        snapToAlignment="center"
        snapToInterval={width - 10}
        showsHorizontalScrollIndicator={false}
      >
        {data.map((item) => (
          <TouchableOpacity style={{ marginHorizontal: 10 }} key={item.id}>
            <Image
              source={{ uri: item.url }}
              style={{ width: width * 0.9, height: 280, resizeMode: "contain" }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
