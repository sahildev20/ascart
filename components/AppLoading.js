import React from "react";
import { View, useWindowDimensions } from "react-native";
import LottieView from "lottie-react-native";
export default function AppLoading({ size }) {
  const { width, height } = useWindowDimensions();

  return (
    <View
      style={{
        width: width - size / 5,
        height: height * 0.8,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LottieView
        autoPlay
        style={{
          width: size,
          height: size,
        }}
        source={require("../assets/lottie/74683-delivery.json")}
      />
    </View>
  );
}
