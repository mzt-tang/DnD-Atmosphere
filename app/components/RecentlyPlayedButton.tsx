import React from "react";
import {StyleSheet, TouchableOpacity, ImageBackground, Text} from "react-native";

export const RecentlyPlayedButton = (props: any) => {

    /**
     * Navigate to the playlist screen
     */
    function navToPlayList(){
        props.navigation.navigate(props.navTo, {playlist: props.title, imageSource: props.source});
    }

    return (
        <TouchableOpacity style={styles.playlistButton} onPress={navToPlayList}>
            <ImageBackground style={styles.imageBg} source={props.source} imageStyle={styles.image}>
                <Text style={styles.playlistTitle}>{props.title}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    imageBg: {
        flex: 1,
        justifyContent: "flex-end",
    },
    playlistTitle: {
        color: "white",
        fontSize: 20,
        marginLeft: 10,
        marginTop: 10,
    },
    playlistButton: {
        flex: 1,
    },
    image: {
        borderRadius: 20,
    },
})