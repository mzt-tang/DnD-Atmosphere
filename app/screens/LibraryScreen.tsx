import React from "react";
import {Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {SearchBar} from "react-native-elements"

export default function LibraryScreen() {

    function navToPlayList(){
        console.log("This would take you to a playlist");
    }

    //Partially temporary, need to get data from database instead
    let playlists = [];
    let couple = [];
    const playlistNum = 20;
    for (let i = 0; i < playlistNum; i++) {
        couple.push({
            title: "Tavern",
            sourceImage: "../assets/images/tavern.jpg",
        });
        if (i%2===1 || i === playlistNum-1) { //Watch out if no. of playlists is odd
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

            <ScrollView style={styles.scroll}>
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
            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#121212",
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
    image: {
        width: 150,
        height: 150,
        marginRight: 10,
        marginLeft: 0,
        justifyContent: "flex-end", 
    },
    imageText: {
        color: "white",
        fontSize: 18,
    },
    couple: {
        //backgroundColor: "red", //This is good for debugging
        width: "100%",
        flexDirection: "row",
        marginBottom: 10,
        justifyContent: "flex-start", //Center is better for different screen sizes but looks weird for odd numbers of playlists
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