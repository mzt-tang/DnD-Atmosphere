import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {View, StyleSheet, SafeAreaView} from "react-native";

import {initialiseFirebase} from "./app/constants/Firebase";
import {TrackContext} from "./app/components/TrackContext";
import {QueueInfoContext} from "./app/components/QueueInfoContext"
import { Audio } from "expo-av";
import {AuthenticatedUserProvider} from "./app/navigation/AuthenticatedUserProvider";
import RootNavigator from "./app/navigation/RootNavigator";

export default function App() {
  initialiseFirebase();


  return (
      <AuthenticatedUserProvider>
        <RootNavigator />
      </AuthenticatedUserProvider>
  );
}

const styles = StyleSheet.create({
  test: {
    backgroundColor: "purple",
  }
})