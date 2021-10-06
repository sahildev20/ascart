import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { CartContext } from "../CartContext";
import AppLoading from "../components/AppLoading";
// firebase UserId to fetch Cartitems with quantity
// Main Function
export function Test2({ navigation }) {
  const image =
    "https://firebasestorage.googleapis.com/v0/b/test-2382e.appspot.com/o/images%2Fpngfind.com-cart-png-2727925.png?alt=media&token=8ec6194f-9de4-4983-957c-1e2b878611cd";

  const {
    items,
    getItemsCount,
    getTotalPrice,
    userId,
    setUserId,
    deviceWidth,
    deviceHeight,
  } = useContext(CartContext);
  let [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(getTotalPrice());
  });

  function Totals() {
    if (total === 0) {
      return (
        <View>
          <Text style={[styles.lineLeft, styles.lineTotal]}>
            Nothing In your Cart !
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.cartLineTotal}>
          <Text style={[styles.lineLeft, styles.lineTotal]}>Total</Text>
          <Text style={styles.lineRight}>$ {total}</Text>
        </View>
      );
    }
  }
  function renderItem({ item }) {
    return (
      <View style={styles.cartLine}>
        <Text style={styles.lineLeft}>
          {item.product.name} x {item.qty}
        </Text>
        <Text style={styles.lineRight}>$ {item.totalPrice}</Text>
      </View>
    );
  }

  if (total === 0) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: deviceWidth,
            height: deviceHeight,
            position: "absolute",
            backgroundColor: "cyan",
            opacity: 0.05,
          }}
        />
        <View
          style={{
            width: deviceWidth,
            height: deviceHeight * 0.4,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AppLoading size={200} />
          <Text style={{ fontWeight: "800", fontSize: 20, marginBottom: 20 }}>
            Nothing in you cart
          </Text>
          <Text style={{ fontWeight: "400", fontSize: 14, marginBottom: 20 }}>
            Add products to cart will appear here
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.Button,
            { width: deviceWidth * 0.9, bottom: deviceHeight * 0.2 },
          ]}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={[styles.buttonText, { fontFamily: "Poppins_Bold" }]}>
            BROWSE PRODUCTS
          </Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <FlatList
        style={styles.itemsList}
        contentContainerStyle={styles.itemsListContainer}
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.product.id.toString()}
        ListFooterComponent={Totals}
      />
    );
  }
}
const styles = StyleSheet.create({
  cartLine: {
    flexDirection: "row",
  },
  Button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    position: "absolute",

    backgroundColor: "orange",
    elevation: 3,
    borderRadius: 20,
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 18,
    color: "white",
  },
  lightText: {
    fontWeight: "400",
    fontSize: 12,
  },
  cartLineTotal: {
    flexDirection: "row",
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
  },
  lineTotal: {
    fontWeight: "bold",
  },
  lineLeft: {
    fontSize: 20,
    lineHeight: 40,
    color: "#333333",
  },
  lineRight: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 40,
    color: "#333333",
    textAlign: "right",
  },
  itemsList: {
    backgroundColor: "#eeeeee",
  },
  itemsListContainer: {
    backgroundColor: "#eeeeee",
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});
