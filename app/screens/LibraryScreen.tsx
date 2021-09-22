import React from "react";
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";

export const LibraryScreen = ({playlistController, miniplayerController}:any) => {
    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.heading}>Soundtracks</Text>
                <ScrollView style={styles.scroll}>
                    {playlistController}
                </ScrollView>
            </View>

            {miniplayerController}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#121212",
    },
    container: {
        flex: 1,
        paddingHorizontal: 25,
    },
    heading: {
        color: "#F4963F",
        fontSize: 36,
        marginTop: 35,
    },
    row: {
        //backgroundColor: "red", //This is good for debugging
        width: "100%",
        flexDirection: "row",
        marginBottom: 10,
        justifyContent: "flex-start", //Center is better for different screen sizes but looks weird for odd numbers of playlists
    },
    scroll: {
        //backgroundColor: "yellow",
    },
})
