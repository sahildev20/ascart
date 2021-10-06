import React, { createContext, useState } from "react";
import { Dimensions } from "react-native";
import { getProduct } from "./services/ProductsService.js";

export const CartContext = createContext();
const { width, height } = Dimensions.get("screen");

export function CartProvider(props) {
  const [items, setItems] = useState([]);
  const [userId, setUserId] = useState("vVuiEB2njocXggwCdMNqP8PxFQP2");
  const deviceWidth = width;
  const deviceHeight = height;

  function addItemToCart(id) {
    const product = getProduct(id);
    setItems((prevItems) => {
      const item = prevItems.find((item) => item.id == id);
      if (!item) {
        return [
          ...prevItems,
          {
            id,
            qty: 1,
            product,
            totalPrice: product.price,
          },
        ];
      } else {
        return prevItems.map((item) => {
          if (item.id == id) {
            item.qty++;
            item.totalPrice += product.price;
          }
          return item;
        });
      }
    });
  }
  function getItemsCount() {
    return items.reduce((sum, item) => sum + item.qty, 0);
  }

  function getTotalPrice() {
    return items.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  return (
    <CartContext.Provider
      value={{
        items,
        setItems,
        getItemsCount,
        addItemToCart,
        getTotalPrice,
        userId,
        setUserId,
        deviceWidth,
        deviceHeight,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
