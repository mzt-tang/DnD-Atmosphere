import React, { RefObject } from "react";
import {Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {SearchBar} from "react-native-elements"
//import "require-from-url";

import {QueueInfoContext} from "../components/QueueInfoContext";
import MiniPlayer from "../components/MiniPlayer";
import Playlist from "../components/Playlist";
import firebase from "firebase/app";

export default function LibraryScreen({navigation} : any) {
    const {queueInfo, setQueueInfo} = React.useContext(QueueInfoContext);
    const [playlists, setPlaylists] = React.useState<any[]>([])

    React.useEffect(() => {
        
        loadFromDatabase();
    }, []);

    async function loadFromDatabase() {
        //const playlistsRef = firebase.firestore().collection("soundtrack-categories");
        const playlistsCollection = await firebase.firestore().collection("soundtrack-categories").get();

        let i = 0;
        let tempPlaylists: any[] = [];
        let row: any[] = [];
        playlistsCollection.docs.forEach(doc => {
            const image = doc.data().image;
            console.log(doc.id);

            row.push({
                title: doc.id,
                source: {uri: image},
                key: i,
            });
            if (i%2===1) { 
                tempPlaylists.push(row);
                row = [];
            }
            i++;
        });
        if (row.length > 0) {
            tempPlaylists.push(row);
        }

        setPlaylists(tempPlaylists);
        console.log("done loading", playlists);

    }

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.heading}>Soundtracks</Text>
                <ScrollView style={styles.scroll}>
                    {playlists.map(row => 

                        <View style={styles.row} key={"r" + row[0].key}>
                            {row.map((playlist: any) => 
                                
                                <Playlist 
                                    source={playlist.source} 
                                    title={playlist.title} 
                                    navigation={navigation} 
                                    key={playlist.key} 
                                    navTo="Playlist"
                                />

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
        marginTop: 35,
    },
    row: {
        //backgroundColor: "red", //This is good for debugging
        width: "100%",
        flexDirection: "row",
        marginBottom: 10,
        justifyContent: "flex-start", //Center is better for different screen sizes but looks weird for odd numbers of playlists
    },
    scroll: {
        //backgroundColor: "yellow",
    },
})