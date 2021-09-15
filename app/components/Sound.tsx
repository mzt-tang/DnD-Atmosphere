import React from "react";
import {Button, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";


export default function Sound(props : any) {

    function playSound() {
        console.log("This would play a sound");
    }

    return (
        <TouchableOpacity onPress={playSound} style={styles.button}>
            <Text style={styles.soundTitle}>{props.title}</Text>
            <AntDesign style={styles.icon} name="caretright" color="white" size={45}/>
            <Text style={styles.soundDuration}>{props.duration}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderColor: "#F4963F",
        borderWidth: 3,
        borderRadius: 20,
        width: 90,
        height: 90,
        marginRight: 20,
    },
    soundTitle: {
        color: "white",
        fontSize: 12,
        marginLeft: 8,
    },
    soundDuration: {
        color: "white",
        fontSize: 12,
        marginRight: 10,
        alignSelf: "flex-end",
    },
    icon: {
        marginTop: 3,
        alignSelf: "center",

    },
});