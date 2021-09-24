import {SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {handleSignOut} from "../domainFunctions/domainFunctions";
import {AntDesign} from "@expo/vector-icons";
import {RecentlyPlayedButton} from "../components";
import React from "react";

export const HomeScreen = ({email, recentTrack, recentBoard, miniplayerController, navigation}: any) => {
    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.appbar}>
                <View style={{flex: 1}}>
                    <Text style={styles.welcome}>Welcome</Text>
                    <Text style={styles.title}>{email}!</Text>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
                    <AntDesign name={"logout"} style={styles.rightIcon} size={40} color="white"/>
                </TouchableOpacity>
            </View>

            <View style={styles.body}>
                <Text style={styles.heading}>Recently Played</Text>

                <Text style={styles.subHeading}>Soundtrack</Text>
                <View style={styles.container}>
                    <RecentlyPlayedButton
                        source={{uri: recentTrack.source}}
                        title={recentTrack.title}
                        navigation={navigation}
                        navTo="Playlist"
                    />
                </View>

                <Text style={styles.subHeading}>Soundboard</Text>
                <View style={styles.container}>
                    <RecentlyPlayedButton
                        source={{uri: recentBoard.source}}
                        title={recentBoard.title}
                        navigation={navigation}
                        navTo="Soundboard"
                    />
                </View>
            </View>

            {miniplayerController}
        </SafeAreaView>
    )
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
    title: {
        flex: 1,
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        marginLeft: 20,
    },
    welcome: {
        flex: 1,
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
    image: {
        borderRadius: 20,
    },
})