import React from "react";
import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProductDetails } from "../screens/ProductDetails.js";
import Home from "../screens/Home.js";
import { Cart } from "../screens/Cart.js";
import { CartIcon } from "../components/CartIcon.js";
import { LogIn } from "../screens/LogIn.js";
import Reviews from "../screens/Reviews";
import { Test2 } from "../screens/Test2.js";
import Profile from "../screens/Profile.js";
import ProductList from "../screens/ProductList.js";
import { Logo, SearchIcon } from "../components/Extras.js";
import Search from "../screens/Search.js";

const Stack = createNativeStackNavigator();

const MainStackNavigator = ({ navigation }) => {
  let [fontloaded] = useFonts({
    Poppins_Black: require("../assets/fonts/Poppins-Black.ttf"),
    Poppins_Bold: require("../assets/fonts/Poppins-Bold.ttf"),
    Poppins_Light: require("../assets/fonts/Poppins-Light.ttf"),
    Poppins_Medium: require("../assets/fonts/Poppins-Medium.ttf"),
    Poppins_Regular: require("../assets/fonts/Poppins-Regular.ttf"),
  });
  if (!fontloaded) {
    return null;
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={() => ({
            headerTitle: () => <Logo />,
            headerRight: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <SearchIcon navigation={navigation} />
                <CartIcon navigation={navigation} />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="ProductList"
          component={ProductList}
          options={({ route }) => ({
            headerTitle: () => <Logo />,
            headerTitleStyle: styles.headerTitle,
            headerRight: () => <CartIcon navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={() => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="Reviews"
          component={Reviews}
          options={() => ({
            headerShown: false,
          })}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
          options={() => ({
            title: "Profile",
            headerTitleStyle: styles.headerTitle,
          })}
        />
        <Stack.Screen
          name="LogIn"
          component={LogIn}
          options={() => ({
            title: "LogIn",
            headerTitleStyle: styles.headerTitle,
          })}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={({ navigation }) => ({
            headerTitle: () => <Logo />,
            headerTitleStyle: styles.headerTitle,
            headerRight: () => <CartIcon navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={() => ({
            title: "My cart",
            headerTitleStyle: styles.headerTitle,
          })}
        />
        <Stack.Screen
          name="Test2"
          component={Test2}
          options={({ navigation }) => ({
            headerShown: false,
            // title: "My Test2",
            // headerTitleStyle: styles.headerTitle,
            // headerRight: () => <CartIcon navigation={navigation} />,
          })}
        />
      </Stack.Navigator>
    );
  }
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
  },
});

export { MainStackNavigator };
