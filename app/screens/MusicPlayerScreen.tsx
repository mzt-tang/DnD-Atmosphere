import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {Button, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Audio} from "expo-av";
import { Slider } from 'react-native-elements';
import TrackPlayer from "react-native-track-player";

export default function MusicPlayerScreen({navigation}: any) {
    const [sound, setSound] = React.useState<Audio.Sound>();

    async function playSound() {
        console.log('Playing Soundtrack');
        sound?.replayAsync();
    }

    function sliderValueChanged(value: any){
        console.log(value);
        sound?.stopAsync();
        //sound?.setPositionAsync(value);
        sound?.playFromPositionAsync(value);
    }

    //Loads the sound (Sometimes it just stops working if so restart the server)
    React.useEffect(() => {
        async function loadSound() {
            const { sound } = await Audio.Sound.createAsync(require('../assets/sounds/TavernsOfAzeroth.mp3'));
            setSound(sound);
            console.log('Soundtrack loaded');
        }
        
        loadSound();
    }, []);

    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.subHeading}>Playing from</Text>
            <Text style={styles.heading}>Tavern</Text>

            <Image source={require("../assets/images/tavern.jpg")} style={styles.image}/>

            <Text style={styles.trackName}>Soundtrack Name</Text>
            <Text style={styles.artist}>Soundtrack Artist</Text>

            <View style={styles.seekBox}>
                <Slider 
                    value={0} 
                    maximumValue={100}
                    onSlidingComplete={value => sliderValueChanged(value)}
                    thumbStyle={styles.sliderThumb} trackStyle={styles.sliderTrack} 
                    minimumTrackTintColor="#F4963F"/>
                
                <Text style={styles.currentTime}>4:54</Text>
                <Text style={styles.endTime}>13:24</Text> 
            </View>

            <View style={styles.icons}>
                <TouchableOpacity>
                    <MaterialIcons name="shuffle" color="#F4963F" size={40}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialIcons name="skip-previous" color="#F4963F" size={60}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={playSound}>
                    <MaterialIcons name="play-circle-outline" color="#F4963F" size={60}/>    
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
        width: 8,
        height: 8,
        backgroundColor: "#F4963F",
    },
    sliderTrack: {
        backgroundColor: "#F4963F",
        height: 5,
        borderRadius: 5,
    }
})