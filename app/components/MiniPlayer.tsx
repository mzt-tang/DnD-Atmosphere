import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, Image, View} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

//Importing individually to prevent recycling warning/error.
import {TrackContext} from "./TrackContext";
import {QueueInfoContext} from "./QueueInfoContext";

export default function MiniPlayer(props: any) {
    const {queue, setQueue} = React.useContext(TrackContext);
    const {queueInfo, setQueueInfo} = React.useContext(QueueInfoContext);

    const [playing, setPlaying] = React.useState<boolean>(false);

    useFocusEffect(() => {
        updatePlaying();
    });

    async function updatePlaying(){
        const status = await queue[queueInfo.queuePos]?.getStatusAsync();
        setPlaying(status.isPlaying);
    }

    function navToMusicPlayer(){
        //console.log("props", props);
        console.log("navigation: ", props.navigation);
        props.navigation.navigate("MusicPlayer");
    }

    function playSound() {
        console.log('Playing Soundtrack');
        console.log(queue[queueInfo.queuePos] !== undefined);

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
        backgroundColor: "black", //"#121212"
        width: "100%",
        height: 80,
        flexDirection: "row"
    },
    bigPlayerButton: {
        //backgroundColor: "red",
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