import React, { useContext } from "react";
import { MainStackNavigator } from "./StackNavigator";
import { StyleSheet } from "react-native";
import { CartIcon } from "../components/CartIcon";
import { CartContext } from "../CartContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Test2 } from "../screens/Test2";
import { Cart } from "../screens/Cart";
import Home from "../screens/Home";
import { Ionicons } from "@expo/vector-icons";
import Settings from "../screens/Settings";
import Explore from "../screens/Explore";
import { Logo } from "../components/Extras";
import User from "../screens/User";

const Tab = createBottomTabNavigator();
function BottomTabNavigator({ navigation }) {
  const { getItemsCount, items } = useContext(CartContext);
  const n = items.length;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 65,
          borderTopWidth: 2,
          position: "absolute",
        },
      }}
    >
      <Tab.Screen
        name="Main"
        component={MainStackNavigator}
        options={({ navigation }) => ({
          // headerTitleStyle: styles.headerTitle,
          headerShown: false,

          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "ios-home" : "ios-home-outline"}
              style={{ color: focused ? "orange" : "grey" }}
              size={24}
            />
          ),
          headerRight: () => <CartIcon navigation={navigation} />,
        })}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={({ navigation }) => ({
          headerTitle: () => <Logo />,

          headerTitleStyle: styles.headerTitle,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "compass" : "md-compass-outline"}
              style={{ color: focused ? "orange" : "grey" }}
              size={28}
            />
          ),

          headerRight: () => <CartIcon navigation={navigation} />,
        })}
      />
      <Tab.Screen
        name="Test2"
        component={Test2}
        options={() => ({
          headerTitle: () => <Logo />,
          headerTitleStyle: styles.headerTitle,
          tabBarBadge: n,
          tabBarBadgeStyle: {
            backgroundColor: "transparent",
            color: "orange",
            position: "relative",
          },
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "cart" : "cart-outline"}
              style={{ color: focused ? "orange" : "grey" }}
              size={24}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={() => ({
          headerTitle: () => <Logo />,

          headerTitleStyle: styles.headerTitle,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "ios-list-circle" : "ios-list-circle-outline"}
              style={{ color: focused ? "orange" : "grey" }}
              size={28}
            />
          ),
        })}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={() => ({
          headerTitle: () => <Logo />,
          headerTitleStyle: styles.headerTitle,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person-circle" : "person-circle-outline"}
              style={{ color: focused ? "orange" : "grey" }}
              size={28}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
  },
});

export { BottomTabNavigator };
