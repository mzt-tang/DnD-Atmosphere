import {SafeAreaView, StatusBar, StyleSheet, Text, View} from "react-native";
import {Search} from "../components";
import React from "react";

export const SearchScreen = () => {
    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.appbar}>
                <Text style={styles.welcome}>Search</Text>
            </View>
            <Search/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#121212',
    },
    appbar: {
        paddingTop: StatusBar.currentHeight,
        height: 120,
        flexDirection: "row",
        borderBottomWidth: 2,
        borderColor: "white",
    },
    title: {
        marginTop: 5,
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        marginLeft: 20,
    },
    welcome: {
        fontSize: 28,
        fontWeight: '600',
        color: '#fff',
        marginLeft: 20,
        marginTop: 10,
        alignSelf: 'flex-end',
    },

})