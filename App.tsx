import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {View, StyleSheet, SafeAreaView} from "react-native";

import LibraryScreen from "./app/screens/LibraryScreen";
import BottomTabNavigation from "./app/navigation/BottomTabNavigation";
import StackNavigation from "./app/navigation/StackNavigation";
import {initialiseFirebase} from "./app/constants/Firebase";
import {TrackContext} from "./app/components/TrackContext";
import {QueueInfoContext} from "./app/components/QueueInfoContext"
import { Audio } from "expo-av";

export default function App() {

  const database = initialiseFirebase();
  const [queue, setQueue] = React.useState();
  const [queueInfo, setQueueInfo] = React.useState({
    mpActive: false,
    queuePos: 0,
  });

  return (
    <TrackContext.Provider value={{queue, setQueue}}>
      <QueueInfoContext.Provider value={{queueInfo, setQueueInfo}}>
        <StackNavigation/>
      </QueueInfoContext.Provider>
    </TrackContext.Provider>
  );
}

const styles = StyleSheet.create({
  test: {
    backgroundColor: "purple",
  }
})