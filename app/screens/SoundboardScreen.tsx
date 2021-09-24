import React from "react";
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";

/**
 * The board screen of a soundboard
 * @param route
 * @param playlistController The playlist of
 * @param miniplayerController
 * @constructor
 */
export const BoardScreen = ({route, playlistController, miniplayerController}:any) => {
    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.heading}>{route.params.playlist}</Text>
                <Text style={styles.subHeading}>Soundboard</Text>

                <ScrollView>
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
        alignSelf: "center",
    },
    subHeading: {
        color: "white",
        fontSize: 20,
        alignSelf: "center",
        marginTop: 5,
        marginBottom: 20,
    },
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
})