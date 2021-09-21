import React from "react";
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";

import {QueueInfoContext} from "../components/QueueInfoContext";
import MiniPlayer from "../components/MiniPlayer";
import firebase from "firebase/app";
import Sound from "../components/Sound";

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
        width: "100%",
        flexDirection: "row",
        marginBottom: 20,
        justifyContent: "flex-start",
    },
})