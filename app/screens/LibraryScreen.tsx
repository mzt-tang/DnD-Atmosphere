import React from "react";
import {Image, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {SearchBar} from "react-native-elements"

export default function LibraryScreen() {

    function navToPlayList(){
        console.log("This would take you to a playlist");
    }

    let playlists = [];
    let couple = [];
    for (let i = 0; i < 6; i++) {
        couple.push({
            title: "Tavern",
            sourceImage: "../assets/images/tavern.jpg",
        });
        if (i%2==1) { //Watch out if no. of playlists is odd
            playlists.push(couple);
            couple = [];
        }
    }

    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.heading}>Soundtracks</Text>

            <View style={styles.searchBar}>
                <TextInput
                    placeholder="Search..."
                />
            </View>

            {playlists.map(couple => 

                <View style={styles.couple}>
                    {couple.map(playlist => 

                        <TouchableOpacity style={styles.touchable} onPress={navToPlayList}>
                            <ImageBackground 
                                source={require("../assets/images/tavern.jpg")} //want this to be sourceImage but doesn't work
                                style={styles.image}>
                                
                                <Text style={styles.imageText}>{playlist.title}</Text>
                                
                            </ImageBackground>
                        </TouchableOpacity>
                    )}
                </View>
            )}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#121212",
        padding: 25,
    },
    heading: {
        color: "#F4963F",
        fontSize: 36,
        marginTop: 35,
    },
    touchable: {
        borderRadius: 100, //Doesn't work for some reason :(
    },
    image: {
        width: 140,
        height: 140,
        marginRight: 25,
        justifyContent: "flex-end",
    },
    imageText: {
        color: "white",
        fontSize: 18,
    },
    couple: {
        //backgroundColor: "red" //This is good for debugging
        width: "100%",
        flexDirection: "row",
        marginBottom: 25,
    },
    searchBar: {
        backgroundColor: "white",
        marginBottom: 35,
        borderRadius: 10,
        paddingLeft: 5,
    }
})