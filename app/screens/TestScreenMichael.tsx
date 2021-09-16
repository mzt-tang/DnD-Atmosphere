import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

export default function TestScreenMichael({navigation}: any) {

    const navToSettings = () => {
        navigation.navigate("Settings")
    }

    return (
        <SafeAreaView style={styles.screen}>
            <Text style={styles.title}>Firebase Storage</Text>
            <View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Record Video</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Pick a Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Pick a Video</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 35,
        marginVertical: 40,
    },
    button: {
        backgroundColor: '#47477b',
        color: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 50,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
    },
})