import 'react-native-gesture-handler';
import React from "react";

import LibraryScreen from "./app/screens/LibraryScreen";
import {View, StyleSheet} from "react-native";

export default function App() {
  return (
      // <View style={styles.test}>
      //   <LibraryScreen/>
      // </View>
      <LibraryScreen/>
  );
}

const styles = StyleSheet.create({
  test: {
    backgroundColor: "purple",
  }
})