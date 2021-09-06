import React from "react";
import {Button, SafeAreaView, StyleSheet} from "react-native";

export default function HomeScreen({navigation}: any) {

    const navToSettings = () => {
        navigation.navigate("Settings")
    }

    return (
        <SafeAreaView style={styles.background}>
            <Button title={"Go to settings"} onPress={navToSettings}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "purple",
    }
})