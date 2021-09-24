import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {Audio} from "expo-av";
import {loadSound, playSound} from "../domainFunctions/domainFunctions";
import {AuthenticatedUserContext} from "../navigation/AuthenticatedUserProvider";

/**
 * Represents a sound effect in the soundboard
 * @param props props from parent element
 */
export default function Sound({title, key, playlistId, audioSource} : any) {
    const [sound, setSound] = React.useState<Audio.Sound>();
    const [duration, setDuration] = React.useState<number>(0);
    const { user } = React.useContext<any>(AuthenticatedUserContext);
    const userId = user.uid;

    React.useEffect(() => {
        loadSound({setSound, audioSource, setDuration}).then();
    }, []);

    //Unloads the sound
    React.useEffect(() => {
        return sound
          ? () => {
              sound.unloadAsync(); }
          : undefined;
      }, []);

    function millisToTimestamp(millis : number) {
        const date = new Date(millis);
        let seconds = "" + date.getSeconds();
        if (date.getSeconds() < 10) {
            seconds = "0" + seconds;
        }
        return date.getMinutes() + ":" + seconds;
    }
    
    return (
        <TouchableOpacity onPress={() => playSound({sound, playlistId, userId})} style={styles.button}>
            <Text style={styles.soundTitle}>{title}</Text>
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