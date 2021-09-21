import React, { useEffect, useState } from "react";
import {Button, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {Audio} from "expo-av";

import {QueueInfoContext} from "../components/QueueInfoContext";
import MiniPlayer from "../components/MiniPlayer";
import firebase from "firebase/app";

function Sound(props : any) {
    const [sound, setSound] = React.useState<Audio.Sound>();
    const [duration, setDuration] = React.useState<number>(0);

    async function playSound() {
        console.log('Playing Sound');
        await sound?.replayAsync(); //if not null play sound 
    }

    async function loadSound() {
        console.log('Loading Sound');
        const { sound , status} = await Audio.Sound.createAsync({uri: props.audioSource});

        setSound(sound);
        setDuration(status.durationMillis);
    }


    //Loads the sound (Sometimes it just stops working if so restart the server)
    React.useEffect(() => {
        loadSound();
    }, []);

    //Unloads the sound
    React.useEffect(() => {
        return sound
          ? () => {
              console.log('Unloading Sound');
              sound.unloadAsync(); }
          : undefined;
      }, [sound]);

    function millisToTimestamp(millis : number) {
        const date = new Date(millis);
        let seconds = "" + date.getSeconds();
        if (date.getSeconds() < 10) {
            seconds = "0" + seconds;
        }
        return date.getMinutes() + ":" + seconds;
    }
    
    return (
        <TouchableOpacity onPress={playSound} style={styles.button}>
            <Text style={styles.soundTitle}>{props.title}</Text>
            <AntDesign style={styles.icon} name="caretright" color="white" size={45}/>
            <Text style={styles.soundDuration}>{millisToTimestamp(duration)}</Text>
        </TouchableOpacity> 
    );
}

export default function BoardScreen(props: any) {
    const {queueInfo, setQueueInfo} = React.useContext(QueueInfoContext);
    const [sounds, setSounds] = React.useState<any[]>([]);

    React.useEffect(() => {
        loadSoundtrackData();
    }, []);

    async function loadSoundtrackData() {
        const soundtrackCollection = await firebase.firestore().collection("soundeffect-categories").doc(props.route.params.playlist).get();
        const effects = await soundtrackCollection.data()?.effects;

        let tempSounds: any[] = [];
        let row = [];
        let i = 0;
        for (let i = 0; i < effects.length; i++){
            let track = await effects[i].get();
            track = track.data();
            track = {...track, key: i};
            row.push(track);
            if (i%3 === 2 || i === effects.length-1) { 
                tempSounds.push(row);
                row = [];
            }
        } 

        console.log("Done loading");
        setSounds(tempSounds);
    }

    //Partially temporary, need to get data from database instead
    /*let sounds = [];
    let row = [];
    const soundboardNum = 18;
    for (let i = 0; i < soundboardNum; i++) {
        row.push({
            title: "Mug Clank",
            duration: "0:02",
            key: i,
        });
        if (i%3 === 2 || i === soundboardNum-1) { 
            sounds.push(row);
            row = [];
        }
    } */

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.heading}>{props.route.params.playlist}</Text>
                <Text style={styles.subHeading}>Soundboard</Text>

                <ScrollView>
                    {sounds.map(row => 

                        <View style={styles.row} key={"r" + row[0].key}>
                            {row.map((sound: any) => 

                                <Sound title={sound.title} key={sound.key} audioSource={sound.link}/>
                            )}
                        </View>
                    )}
                </ScrollView>
            </View> 

            {queueInfo.mpActive && <MiniPlayer navigation={props.navigation}/>}

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
    row: {
        //backgroundColor: "red", //This is good for debugging
        width: "100%",
        flexDirection: "row",
        marginBottom: 20,
        justifyContent: "flex-start", //Center is better for different screen sizes but looks weird for odd numbers of soundboards
    },
})