import React from "react";
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";


export const SoundboardListScreen = ({playlistController, miniplayerController}:any) => {
    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.heading}>Soundboards</Text>

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
    touchable: {
        borderRadius: 100, //Doesn't work for some reason :( tried it on image as well
    },
    imageBackground: {
        width: 150,
        height: 150,
        marginRight: 10,
        marginLeft: 0,
        justifyContent: "flex-end",
        borderRadius: 30,
    },
    image: {
        borderRadius: 20,
    },
    imageText: {
        color: "white",
        fontSize: 18,
        marginBottom: 5,
        marginLeft: 5,
    },
    searchBar: {
        backgroundColor: "white",
        marginBottom: 35,
        borderRadius: 10,
        paddingLeft: 5,
    },
    scroll: {
        //backgroundColor: "yellow",
    }
})