import React from "react";
import {StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from "firebase/app";
import 'firebase/storage';

export default function TestScreenMichael({navigation}: any) {

    let onChooseImagePress = async () => {
        //let result = await ImagePicker.launchCameraAsync();
        let result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled) {
            await uploadImage(result.uri, "test-image")
                .then(() => {
                    Alert.alert("Success");
                    console.log("Works")
                }).catch((error) => {
                    Alert.alert(error);
                    console.log(error);
                });
        }
    }

    let uploadImage = async(uri:any, imageName:string) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase.storage().ref().child("images/" + imageName);
        return ref.put(blob);
    }

    return (
        <SafeAreaView style={styles.screen}>
            <Text style={styles.title}>Firebase Storage</Text>
            <View>
                <TouchableOpacity style={styles.button} onPress={onChooseImagePress}>
                    <Text style={styles.buttonText}>Upload Image</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Select Audio</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Play Audio</Text>
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