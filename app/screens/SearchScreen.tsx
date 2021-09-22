import React from "react";
import {SafeAreaView, StyleSheet} from "react-native";
import Search from "../components/Search";

export default function SearchScreen() {
    return (
        <SafeAreaView style={styles.background}>
            <Search/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "green",
    }
})