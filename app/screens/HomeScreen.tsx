import React from "react";
import {Button, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";

import {QueueInfoContext} from "../components/QueueInfoContext";
import MiniPlayer from "../components/MiniPlayer";
import {db} from "../constants/Firebase";
import {AuthenticatedUserContext} from "../navigation/AuthenticatedUserProvider";

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
            <StatusBar style='dark'/>
            <View style={styles.container}>
                <Text>Welcome {user.email}!</Text>
                <Button title={"Go to settings"} onPress={navToSettings}/>
                <Button title={"Log out"} onPress={handleSignOut}/>
            </View>
            <Text>Your UID is: {user.uid}</Text>
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
        flexDirection: "row",
    },
})