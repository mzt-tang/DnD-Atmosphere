import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, StatusBar, ScrollView} from "react-native";

export default function PlaylistScreen({navigation}: any) {

    function navToMusicPlayer() {
        navigation.navigate("MusicPlayer");
    }

    //Partially temporary, need to get data from database instead
    let soundtracks = [];
    const soundtrackNum = 20;
    for (let i = 0; i < soundtrackNum; i++) {
        soundtracks.push({
            title: "Soundtrack Name",
            artist: "Artist Name",
            key: i,
        });
    }

    return (
        <SafeAreaView style={styles.background}>
                <ImageBackground source={require("../assets/images/tavern.jpg")} style={styles.imageHeader}>
                    <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
                        <AntDesign name="arrowleft" color="white" size={25}/>
                    </TouchableOpacity>

                    <Text style={styles.subTitle}>Playlist</Text>
                    <Text style={styles.title}>Tavern</Text> 
                </ImageBackground>

                <ScrollView>
                    {soundtracks.map(soundtrack => 
                        <TouchableOpacity onPress={navToMusicPlayer} style={styles.soundtrack} key={soundtrack.key}>
                            <Text style={styles.trackTitle}>{soundtrack.title}</Text>
                            <Text style={styles.trackArtist}>{soundtrack.artist}</Text>
                        </TouchableOpacity>
                    )}
                </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#121212",
    },
    imageHeader: {
        width: "100%",
        height: 200,
        justifyContent: "center",
    },
    backButton: {
        position: "absolute",
        top: StatusBar.currentHeight, //<< Cool trick
        left: 15,
        padding: 10,
    },
    subTitle: {
        alignSelf: "center",
        color: "white",
        fontSize: 20,
        fontStyle: "italic",
    },
    title: {
        alignSelf: "center",
        color: "white",
        fontSize: 36,
    },
    soundtrack: {
        width: "100%",
        height: 70,
        borderColor: "white",
        borderTopWidth: 3,
        //borderBottomWidth: 3,
        //backgroundColor: "red",
    },
    trackTitle: {
        color: "white",
        fontSize: 20,
        marginTop: 5,
        marginLeft: 10,
    },
    trackArtist: {
        color: "white",
        fontSize: 16,
        fontStyle: "italic",
        marginTop: 2,
        marginLeft: 10,
    },
})