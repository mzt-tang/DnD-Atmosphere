import React from "react";
import {Button, SafeAreaView, StyleSheet, View} from "react-native";

import {QueueInfoContext} from "../components/QueueInfoContext";
import MiniPlayer from "../components/MiniPlayer";

export default function HomeScreen({navigation}: any) {
    const {queueInfo, setQueueInfo} = React.useContext(QueueInfoContext);

    const navToSettings = () => {
        navigation.navigate("Settings")
    }

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.container}>
                <Button title={"Go to settings"} onPress={navToSettings}/>


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
    },
})