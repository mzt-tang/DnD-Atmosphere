import React from "react";
import {Button, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, StatusBar, ImageBackground, Touchable} from "react-native";

import {QueueInfoContext} from "../components/QueueInfoContext";
import MiniPlayer from "../components/MiniPlayer";
import {db} from "../constants/Firebase";
import {AuthenticatedUserContext} from "../navigation/AuthenticatedUserProvider";
import {Card} from "react-native-elements";
import {AntDesign, Ionicons, MaterialIcons} from "@expo/vector-icons";

const auth = db.auth();

export default function HomeScreen({navigation}: any) {
    const {queueInfo, setQueueInfo} = React.useContext(QueueInfoContext);
    const { user } = React.useContext<any>(AuthenticatedUserContext);
    const handleSignOut = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.log(error);
        }
    };

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
                        <ImageBackground style={styles.imageBg} source={require("../assets/images/tavern.jpg")} imageStyle={styles.image}>
                            <Text style={styles.playlistTitle}>Tavern</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>

                <Text style={styles.subHeading}>Soundboard</Text>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.playlistButton}>
                        <ImageBackground style={styles.imageBg} source={require("../assets/images/tavern.jpg")} imageStyle={styles.image}>
                            <Text style={styles.playlistTitle}>Tavern</Text>
                        </ImageBackground>
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