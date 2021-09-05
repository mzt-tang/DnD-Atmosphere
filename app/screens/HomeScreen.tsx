import React from "react";
import {SafeAreaView, StyleSheet} from "react-native";

export default function HomeScreen() {
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