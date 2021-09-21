import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, StatusBar, ScrollView} from "react-native";
import {Audio, AVPlaybackStatus} from "expo-av";

import { TrackContext } from "../components/TrackContext";
import MiniPlayer from "../components/MiniPlayer";
import Soundtrack from "../components/Soundtrack";
import { QueueInfoContext } from "../components/QueueInfoContext";
import firebase from "firebase/app";

export default function PlaylistScreen({navigation, route}: any) {
    const {queue, setQueue} = React.useContext(TrackContext);
    const {queueInfo, setQueueInfo} = React.useContext(QueueInfoContext);
    const [soundtracks, setSoundtracks] = React.useState<any[]>([]);

    React.useEffect(() => {
        loadSoundtrackData();
    }, []);

    async function loadSoundtrackData() {
        const soundtrackCollection = await firebase.firestore().collection("soundtrack-categories").doc(route.params.playlist).get();
        const tracks = soundtrackCollection.data()?.tracks;

        let tempSoundtracks: any[] = [];
        let i = 0;
        for (let i = 0; i < tracks.length; i++){
            let track = await tracks[i].get();
            track = track.data();
            track = {...track, key: i};
            tempSoundtracks.push(track);
        }

        console.log("Done loading");
        setSoundtracks(tempSoundtracks);
    }

    async function onTrackPress(trackObject: any, playlistObject: any) {
        await loadPlaylistAudio(trackObject, playlistObject);
        navigation.navigate("MusicPlayer");
        
    }

    async function loadPlaylistAudio(trackObject: any, playlistObject: any) {
        if (queueInfo.mpActive){
            console.log("Unloading queue 0")
            queue[queueInfo.queuePos]?.unloadAsync();
        }

        const playlist:Audio.Sound[] = [];
        const { sound: soundObject, status: soundStatus} = await Audio.Sound.createAsync({uri: trackObject.link});
        playlist.push(soundObject); 

        setQueue(playlist);
        setQueueInfo({...queueInfo, mpActive: true, trackTitle: trackObject.title, trackImage: playlistObject.imageSource, trackPlaylist: playlistObject.playlist});
        
    }

    return (
        <SafeAreaView style={styles.background}>
                <ImageBackground source={route.params.imageSource} style={styles.imageHeader}>
                    <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
                        <AntDesign name="arrowleft" color="white" size={25}/>
                    </TouchableOpacity>

                    <Text style={styles.subTitle}>Playlist</Text>
                    <Text style={styles.title}>{route.params.playlist}</Text> 
                </ImageBackground>

                <ScrollView>
                    {soundtracks.map(soundtrack => 
                        <Soundtrack title={soundtrack.title} onTrackPress={onTrackPress} key={soundtrack.key} trackObject={soundtrack} playlistObject={route.params}/>
                    )}
                </ScrollView>

                {queueInfo.mpActive && <MiniPlayer navigation={navigation}/>}
                
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#121212",
    },
    imageHeader: {
        width: "100%",
        height: 200,
        justifyContent: "center",
    },
    backButton: {
        position: "absolute",
        top: StatusBar.currentHeight, //<< Cool trick
        left: 15,
        padding: 10,
    },
    subTitle: {
        alignSelf: "center",
        color: "white",
        fontSize: 20,
        fontStyle: "italic",
    },
    title: {
        alignSelf: "center",
        color: "white",
        fontSize: 36,
    },
    soundtrack: {
        width: "100%",
        height: 70,
        borderColor: "white",
        borderTopWidth: 3,
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

/*<TouchableOpacity onPress={onTrackPress} style={styles.soundtrack} key={soundtrack.key}>
    <Text style={styles.trackTitle}>{soundtrack.title}</Text>
    <Text style={styles.trackArtist}>Artist Name</Text>
</TouchableOpacity>*/