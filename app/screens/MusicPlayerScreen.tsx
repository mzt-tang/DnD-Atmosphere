import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { Slider } from 'react-native-elements';

export const MusicPlayerScreen = ({queueInfo, position, duration, millisToTimestamp, playSound, playing}:any) => {
    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.subHeading}>Playing from</Text>
            <Text style={styles.heading}>{queueInfo.trackPlaylist}</Text>

            <Image source={queueInfo.trackImage} style={styles.image}/>

            <Text style={styles.trackName}>{queueInfo.trackTitle}</Text>
            <Text style={styles.artist}>Soundtrack Artist</Text>

            <View style={styles.seekBox}>
                <Slider
                    value={position}
                    maximumValue={duration}
                    thumbStyle={styles.sliderThumb} trackStyle={styles.sliderTrack}
                    minimumTrackTintColor="#F4963F"/>

                <Text style={styles.currentTime}>{millisToTimestamp(position)}</Text>
                <Text style={styles.endTime}>{millisToTimestamp(duration)}</Text>
            </View>

            <View style={styles.icons}>
                <TouchableOpacity>
                    <MaterialIcons name="shuffle" color="#F4963F" size={40}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialIcons name="skip-previous" color="#F4963F" size={60}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={playSound}>
                    <MaterialIcons name={playing? "pause-circle-outline" : "play-circle-outline"} color="#F4963F" size={60}/>
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
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    sliderThumb: {
        width: 5,
        height: 5,
        backgroundColor: "#F4963F",
    },
    sliderTrack: {
        backgroundColor: "#F4963F",
        height: 5,
        borderRadius: 5,
    }
})