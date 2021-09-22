import React from "react";
import {Button, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";

import {QueueInfoContext} from "../components/QueueInfoContext";
import MiniPlayer from "../components/MiniPlayer";
import {db} from "../constants/Firebase";
import {AuthenticatedUserContext} from "../navigation/AuthenticatedUserProvider";
import {Card} from "react-native-elements";
import {Ionicons} from "@expo/vector-icons";

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

    const navToSettings = () => {
        navigation.navigate("Settings")
    }

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.appbar}>
                <View style={{flex: 1}}>
                    <Text style={styles.welcome}>Welcome</Text>
                    <Text style={styles.title}>{user.email}!</Text>
                </View>
                {/*<Button title={"Go to settings"} onPress={navToSettings}/>*/}
                {/*<Button title={"Log out"} onPress={handleSignOut}/>*/}
                <Ionicons name={"settings-sharp"} style={styles.rightIcon}/>
            </View>
            <View style={styles.container}>
                <Card containerStyle={styles.container1}>

                </Card>
            </View>
            <View style={styles.container}>
                <Card containerStyle={styles.container2}>

                </Card>
            </View>
            <Text style={{color: '#fff'}}>Your UID is: {user.uid}</Text>
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
        flex: 1,
        backgroundColor: 'green',
        flexDirection: "row",
    },
    container: {
        flex: 2,
    },
    container1: {
        flex: 1,
        backgroundColor: 'pink',
    },
    container2: {
        flex: 1,
        backgroundColor: 'yellow',
    },
    title: {
        flex: 1,
        fontSize: 24,
        fontWeight: '600',
        color: '#fff',
        alignSelf: 'flex-start',
        paddingLeft: 24
    },
    welcome: {
        flex: 1,
        fontSize: 24,
        fontWeight: '600',
        color: '#fff',
        alignSelf: 'flex-start',
        paddingLeft: 24
    },
    rightIcon: {
        alignSelf: 'center',
        marginRight: 24
    },
})