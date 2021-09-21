import React from "react";
import {Button, SafeAreaView, StyleSheet, View, TouchableOpacity, ImageBackground, Text} from "react-native";

export default function Playlist(props: any) {

    function navToPlayList(){
        props.navigation.navigate(props.navTo, {playlist: props.title, imageSource: props.source});
    }
    
    return (
        <TouchableOpacity onPress={navToPlayList}>
            <ImageBackground 
                source={props.source}
                style={styles.imageBackground}
                imageStyle={styles.image}>
                
                <Text style={styles.imageText}>{props.title}</Text>
                
            </ImageBackground>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
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
})