import React, { useEffect, useState } from "react";
import {Button, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {Audio} from "expo-av";

import {QueueInfoContext} from "../components/QueueInfoContext";
import MiniPlayer from "../components/MiniPlayer";

function Sound(props : any) {
    const [sound, setSound] = React.useState<Audio.Sound>();

    async function playSound() {
        console.log('Playing Sound');
        await sound?.replayAsync(); //if not null play sound 
    }

    async function loadSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(require('../assets/sounds/mug-clank.wav'));
        setSound(sound);
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
    
    return (
        <TouchableOpacity onPress={playSound} style={styles.button}>
            <Text style={styles.soundTitle}>{props.title}</Text>
            <AntDesign style={styles.icon} name="caretright" color="white" size={45}/>
            <Text style={styles.soundDuration}>{props.duration}</Text>
        </TouchableOpacity> 
    );
}

export default function BoardScreen({navigation}: any) {
    const {queueInfo, setQueueInfo} = React.useContext(QueueInfoContext);

    //Partially temporary, need to get data from database instead
    let sounds = [];
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
    }

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.heading}>Tavern</Text>
                <Text style={styles.subHeading}>Soundboard</Text>

                <ScrollView>
                    {sounds.map(row => 

                        <View style={styles.row} key={"r" + row[0].key}>
                            {row.map(sound => 

                                <Sound title="Mug Clank" duration="0:02" key={sound.key}/>
                            )}
                        </View>
                    )}
                </ScrollView>
            </View> 

            {queueInfo.mpActive && <MiniPlayer navigation={navigation}/>}

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