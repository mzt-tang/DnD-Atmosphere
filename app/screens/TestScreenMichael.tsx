import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from "firebase/app";
import 'firebase/storage';

export default function TestScreenMichael({navigation}: any) {

    const [imageUrl, setImageUrl] = useState(undefined);

    useEffect(() => {
        firebase.storage().ref('/' + 'images/test-image1').getDownloadURL().then((url) => {
            setImageUrl(url);
        }).catch((e) => console.log('Errors while downloading => ', e));
    }, []);

    const onChooseImagePress = async () => {
        //let result = await ImagePicker.launchCameraAsync();
        let result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled) {
            await uploadImage(result.uri, "test-image1")
                .then(() => {
                    Alert.alert("Success");
                    console.log("Works")
                }).catch((error) => {
                    Alert.alert(error);
                    console.log(error);
                });
        }
    }

    const uploadImage = async (uri: any, imageName: string) => {
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
            <Image style={{width: '50%', height: '50%'}} source={{uri: imageUrl}}/>
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