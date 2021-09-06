import React from "react";
import {SafeAreaView, StyleSheet} from "react-native";

import BottomTabNavigation from "../components/BottomTabNavigation";
import {NavigationContainer} from "@react-navigation/native";

export default function LibraryScreen() {
    return (
        <SafeAreaView style={styles.background}>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "orange",
    }
})