import React from "react";

import LibraryScreen from "./app/screens/LibraryScreen";
import {View, StyleSheet} from "react-native";

export default function App() {
  return (
      <LibraryScreen/>
  );
}

const styles = StyleSheet.create({
  test: {
    backgroundColor: "purple",
  }
})