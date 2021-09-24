import React from "react";
import {SafeAreaView, StyleSheet, Text, View, TouchableOpacity, StatusBar, ImageBackground} from "react-native";

import {MiniPlayer, PlaylistButton} from "../components";
import {db, QueueInfoContext} from "../constants";
import {AuthenticatedUserContext} from "../navigation/AuthenticatedUserProvider";
import {AntDesign} from "@expo/vector-icons";

const auth = db.auth();

export default function HomeScreen({navigation}: any) {
    const {queueInfo, setQueueInfo} = React.useContext(QueueInfoContext);
    const { user } = React.useContext<any>(AuthenticatedUserContext);
    const [recentTrack, setRecentTrack] = React.useState<any>({});
    const [recentBoard, setRecentBoard] = React.useState<any>({});
    React.useEffect(() => {
        test();
    }, []);


    const handleSignOut = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.log(error);
        }
    };

    async function test() {
        const userDoc = db.firestore().collection('users').doc(user.uid);
        userDoc.onSnapshot(async snapshot => {
            const soundtrack = await snapshot.data()?.recentlyPlayedSoundtracks;
            const soundBoard = await snapshot.data()?.recentlyPlayedSoundEffects;
            const trackRef = await db.firestore().collection('soundtrack-categories').doc(soundtrack).get();
            const boardRef = await db.firestore().collection('soundeffect-categories').doc(soundtrack).get();

            setRecentTrack({title: trackRef.id, source: trackRef.data()?.image});
            setRecentBoard({title: boardRef.id, source: boardRef.data()?.image});

        });
    }

    // function navToPlayList(){
    //     navigation.navigate("Playlist", {playlist: props.title, imageSource: props.source});
    // }

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.appbar}>
                <View style={{flex: 1}}>
                    <Text style={styles.welcome}>Welcome</Text>
                    <Text style={styles.title}>{user.email}!</Text>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
                    <AntDesign name={"logout"} style={styles.rightIcon} size={40} color="white"/>
                </TouchableOpacity>
            </View>

            <View style={styles.body}>
                <Text style={styles.heading}>Recently Played</Text>

                <Text style={styles.subHeading}>Soundtrack</Text>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.playlistButton}>
                        {/*<ImageBackground style={styles.imageBg} source={require("../assets/images/tavern.jpg")} imageStyle={styles.image}>*/}
                        {/*    <Text style={styles.playlistTitle}>Tavern</Text>*/}
                        {/*</ImageBackground>*/}
                        <PlaylistButton
                            source={recentTrack.source}
                            title={recentTrack.title}
                            navigation={navigation}
                            navTo="Playlist"
                        />
                    </TouchableOpacity>
                </View>

                <Text style={styles.subHeading}>Soundboard</Text>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.playlistButton}>
                        {/*<ImageBackground style={styles.imageBg} source={require("../assets/images/tavern.jpg")} imageStyle={styles.image}>*/}
                        {/*    <Text style={styles.playlistTitle}>Tavern</Text>*/}
                        {/*</ImageBackground>*/}
                        <PlaylistButton
                            source={recentBoard.source}
                            title={recentBoard.title}
                            navigation={navigation}
                            navTo="Soundboard"
                        />
                    </TouchableOpacity>
                </View>
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
    appbar: {
        paddingTop: StatusBar.currentHeight,
        height: 120,
        flexDirection: "row",
        borderBottomWidth: 2,
        borderColor: "white",
    },
    logoutButton: {
        justifyContent: "center",
    },
    body: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    container: {
        flex: 2,
        padding: 0,
    },
    playlistButton: {
        flex: 1,
    },
    title: {
        marginTop: 5,
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        marginLeft: 20,
    },
    welcome: {
        fontSize: 28,
        fontWeight: '600',
        color: '#fff',
        marginLeft: 20,
        marginTop: 10,
    },
    rightIcon: {
        alignSelf: 'center',
        marginRight: 24
    },
    heading: {
        marginTop: 5,
        color: "#F4963F",
        fontSize: 30,
    },
    subHeading: {
        color: "white",
        fontSize: 20,
        marginTop: 15,
    },
    imageBg: {
        flex: 1,
        justifyContent: "flex-end",
    },
    image: {
        borderRadius: 20,
    },
    playlistTitle: {
        color: "white",
        fontSize: 20,
        marginLeft: 10,
        marginTop: 10,
    }
})