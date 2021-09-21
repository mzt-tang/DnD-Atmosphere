import React from "react";
import {Button, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {Audio} from "expo-av";


export default function Sound(props : any) {
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

const styles = StyleSheet.create({
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
});