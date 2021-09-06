import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {View, StyleSheet, SafeAreaView} from "react-native";

import LibraryScreen from "./app/screens/LibraryScreen";
import BottomTabNavigation from "./app/navigation/BottomTabNavigation";
import StackNavigation from "./app/navigation/StackNavigation"

export default function App() {
  return (
      <StackNavigation/>
  );
}

const styles = StyleSheet.create({
  test: {
    backgroundColor: "purple",
  }
})