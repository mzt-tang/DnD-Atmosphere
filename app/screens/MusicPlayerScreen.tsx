import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {Button, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default function MusicPlayerScreen({navigation}: any) {
    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.subHeading}>Playing from</Text>
            <Text style={styles.heading}>Tavern</Text>

            <Image source={require("../assets/images/tavern.jpg")} style={styles.image}/>

            <Text style={styles.trackName}>Soundtrack Name</Text>
            <Text style={styles.artist}>Soundtrack Artist</Text>

            <View style={styles.seekBox}>
                <View style={styles.seekBar}>
                    <View style={styles.seekProgress} />
                </View>
                    <Text style={styles.currentTime}>4:54</Text>
                    <Text style={styles.endTime}>13:29</Text> 
            </View>

            <View style={styles.icons}>
                <TouchableOpacity>
                    <MaterialIcons name="shuffle" color="#F4963F" size={40}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialIcons name="skip-previous" color="#F4963F" size={60}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialIcons name="play-circle-outline" color="#F4963F" size={60}/>    
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialIcons name="skip-next" color="#F4963F" size={60}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialIcons name="loop" color="#F4963F" size={40}/>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#121212",
    },
    heading: {
        color: "#F4963F",
        fontSize: 20,
        alignSelf: "center",
    },
    subHeading: {
        color: "white",
        fontSize: 16,
        alignSelf: "center",
        marginBottom: 5,
    },
    image: {
        width: 280,
        height: 280,
        marginTop: 10,
        alignSelf: "center",
    },
    trackName: {
        color: "#F4963F",
        fontSize: 20,
        alignSelf: "center",
        marginTop: 30,
    },
    artist: {
        color: "white",
        fontSize: 16,
        alignSelf: "center",
    },
    seekBar: {
        backgroundColor: "white",
        height: 5,
        borderRadius: 5,
    }, 
    seekProgress: {
        backgroundColor: "#F4963F",
        width: 100,
        height: 5,
        borderRadius: 5,
    },
    seekBox: {
        alignSelf: "center",
        width: 320,
        marginTop: 30,
    },
    timeTexts: {
        flexDirection: "row",
    },
    currentTime: {
        color: "white",
        fontSize: 10,
        position: "absolute",
        top: 5,
    },
    endTime: {
        color: "white",
        fontSize: 10,
        position: "absolute",
        alignSelf: "flex-end",
        top: 5
    },
    icons: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 40,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    }
})