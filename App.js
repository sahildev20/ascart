import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { CartProvider } from "./CartContext";

import { BottomTabNavigator } from "./navigation/BottomTabNavigator";
function App() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
      </CartProvider>
    </SafeAreaProvider>
  );
}

export default App;
