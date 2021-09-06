import React from "react";

import LibraryScreen from "./app/screens/LibraryScreen";
import {View, StyleSheet, SafeAreaView} from "react-native";
import BottomTabNavigation from "./app/components/BottomTabNavigation";
import {NavigationContainer} from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabNavigation/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  test: {
    backgroundColor: "purple",
  }
})