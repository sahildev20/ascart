import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const Covers = [
  { id: "1", title: "I Phone 6s", price: 100, reviews: 4 },
  { id: "2", title: "I Phone 6s", price: 100, reviews: 4 },
  { id: "3", title: "I Phone 6s", price: 100, reviews: 4 },
  { id: "4", title: "I Phone 6s", price: 100, reviews: 4 },
];

const Stationary = [
  { id: "1", title: "IPhone 6s", price: 100, reviews: 4 },
  { id: "2", title: "IPhone 6s", price: 100, reviews: 4 },
  { id: "3", title: "IPhone 6s", price: 100, reviews: 4 },
  { id: "4", title: "IPhone 6s", price: 100, reviews: 4 },
];

const Earphones = [
  { id: "1", title: "IPhone 6s", price: 100, reviews: 4 },
  { id: "2", title: "IPhone 6s", price: 100, reviews: 4 },
  { id: "3", title: "IPhone 6s", price: 100, reviews: 4 },
  { id: "4", title: "IPhone 6s", price: 100, reviews: 4 },
];

const FastFood = [
  {
    id: "1",
    title: "Momos",
    price: 100,
    reviews: 4,
    image:
      "https://firebasestorage.googleapis.com/v0/b/test-2382e.appspot.com/o/images%2Fgreen.png?alt=media&token=951d26ba-002d-4990-a538-2a3aa05dfbac",
  },
  {
    id: "2",
    title: "Burger",
    price: 100,
    reviews: 4,
    image:
      "https://firebasestorage.googleapis.com/v0/b/test-2382e.appspot.com/o/images%2Fgreen.png?alt=media&token=951d26ba-002d-4990-a538-2a3aa05dfbac",
  },
  {
    id: "3",
    title: "Gol Gappa",
    price: 100,
    reviews: 4,
    image:
      "https://firebasestorage.googleapis.com/v0/b/test-2382e.appspot.com/o/images%2Fgreen.png?alt=media&token=951d26ba-002d-4990-a538-2a3aa05dfbac",
  },
  {
    id: "4",
    title: "Chawmeen",
    price: 100,
    reviews: 4,
    image:
      "https://firebasestorage.googleapis.com/v0/b/test-2382e.appspot.com/o/images%2Fgreen.png?alt=media&token=951d26ba-002d-4990-a538-2a3aa05dfbac",
  },
];

const BannerData = [
  {
    url: "https://firebasestorage.googleapis.com/v0/b/test-2382e.appspot.com/o/images%2Fbanner5.png?alt=media&token=169bb59c-3ffd-4a94-911f-f2df811ae65d",
    id: "1",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/test-2382e.appspot.com/o/images%2Fbanner5.png?alt=media&token=169bb59c-3ffd-4a94-911f-f2df811ae65d",

    id: "2",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/test-2382e.appspot.com/o/images%2Fbanner5.png?alt=media&token=169bb59c-3ffd-4a94-911f-f2df811ae65d",

    id: "3",
  },
];

const CatData = [
  {
    id: "1",
    title: "Covers",
    image: require("../assets/categories/covers.png"),
  },
  {
    id: "2",
    title: "Grocery",
    image: require("../assets/categories/covers.png"),
  },
  {
    id: "3",
    title: "Stationary",
    image: require("../assets/categories/covers.png"),
  },
  {
    id: "4",
    title: "Earphones",
    image: require("../assets/categories/covers.png"),
  },
  {
    id: "5",
    title: "Shoes",
    image: require("../assets/categories/covers.png"),
  },
  {
    id: "6",
    title: "FastFood",
    image: require("../assets/categories/covers.png"),
  },
];

export { FastFood, Covers, BannerData, CatData, Earphones };
