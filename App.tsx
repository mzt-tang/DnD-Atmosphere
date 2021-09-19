import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {View, StyleSheet, SafeAreaView} from "react-native";

import LibraryScreen from "./app/screens/LibraryScreen";
import BottomTabNavigation from "./app/navigation/BottomTabNavigation";
import StackNavigation from "./app/navigation/StackNavigation";
import {initialiseFirebase} from "./app/constants/Firebase";
import {TrackContext} from "./app/components/TrackContext";
import { Audio } from "expo-av";

export default function App() {

  const database = initialiseFirebase();
  const [queue, setQueue] = React.useState();

  return (
    <TrackContext.Provider value={{queue, setQueue}}>
      <StackNavigation/>
    </TrackContext.Provider>
  );
}

const styles = StyleSheet.create({
  test: {
    backgroundColor: "purple",
  }
})