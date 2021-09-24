import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, Image, View} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import {TrackContext, QueueInfoContext} from "../constants";

/**
 * A Mini Music player component that can be put at the bottom of any screen
 * @param props props from parent element
 */
export default function MiniPlayer(props: any) {
    const {queue, setQueue} = React.useContext(TrackContext);
    const {queueInfo, setQueueInfo} = React.useContext(QueueInfoContext);

    const [playing, setPlaying] = React.useState<boolean>(false);

    // This is used instead of useEffect since it triggers when you navigate down the stack not just up the stack
    useFocusEffect(() => {
        updatePlaying();
    });

    /**
     * Sets the playing state depending on is the audio playback object is playing or not.
     * This is used for the play/pause button.
     */
    async function updatePlaying(){
        const status = await queue[queueInfo.queuePos]?.getStatusAsync();
        setPlaying(status.isPlaying);
    }

    /**
     * Navigate to the MusicPlayerScreen
     */
    function navToMusicPlayer(){
        props.navigation.navigate("MusicPlayer");
    }

    /**
     * Switches if the playing state of the soundtrack
     */
    function playSound() {
        if (!playing){
            queue[queueInfo.queuePos]?.setStatusAsync({shouldPlay: true});
            setPlaying(true);
        } else {
            queue[queueInfo.queuePos]?.setStatusAsync({shouldPlay: false});
            setPlaying(false);
        }
    }

    return (
        <SafeAreaView style={styles.background}>
            <TouchableOpacity style={styles.bigPlayerButton} onPress={navToMusicPlayer}>
                <Image source={queueInfo.trackImage} style={styles.image} />
                <View>
                    <Text style={styles.trackTitle}>{queueInfo.trackTitle}</Text>
                    <Text style={styles.trackArtist}>Artist Name</Text>
                </View>
                
            </TouchableOpacity>
            <TouchableOpacity style={styles.playButton} onPress={playSound}>
                <MaterialIcons name={playing ? "pause" : "play-arrow"} color="white" size={60}/> 
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "black",
        width: "100%",
        height: 80,
        flexDirection: "row"
    },
    bigPlayerButton: {
        flex: 1,
        flexDirection: "row",
    }, 
    playButton: {
        width: 80,
        height: 80,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 80,
        height: 80,
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