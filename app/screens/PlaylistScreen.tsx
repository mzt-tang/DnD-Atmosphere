import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, StatusBar, ScrollView} from "react-native";

export const PlaylistScreen = ({route, onNavGoBack, playlistController, miniplayerController}:any) => {
    return (
        <SafeAreaView style={styles.background}>
            <ImageBackground source={route.params.imageSource} style={styles.imageHeader}>
                <TouchableOpacity style={styles.backButton} onPress={onNavGoBack}>
                    <AntDesign name="arrowleft" color="white" size={25}/>
                </TouchableOpacity>
                <Text style={styles.subTitle}>Playlist</Text>
                <Text style={styles.title}>{route.params.playlist}</Text>
            </ImageBackground>

            <ScrollView>
                {playlistController}
            </ScrollView>

            {miniplayerController}
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
        top: StatusBar.currentHeight,
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