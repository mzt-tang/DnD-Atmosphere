import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import {StyleSheet, Text, View, Button as RNButton, Button} from 'react-native';

import InputField from "../components/InputField";
import ErrorMessage from "../components/ErrorMessage";
import {db} from "../constants/Firebase";

const auth = db.auth();

export default function SignupScreen({ navigation }:any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');
    const [signupError, setSignupError] = useState('');

    const handlePasswordVisibility = () => {
        if (rightIcon === 'eye') {
            setRightIcon('eye-off');
            setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'eye-off') {
            setRightIcon('eye');
            setPasswordVisibility(!passwordVisibility);
        }
    };

    const onHandleSignup = async () => {
        try {
            if (email !== '' && password !== '') {
                await auth.createUserWithEmailAndPassword(email, password).then(cred => {
                    return db.firestore().collection('users').doc(cred.user?.uid).set({
                        recentlyPlayedSoundtracks: [], //todo add initial data here.
                        recentlyPlayedSoundEffects: [],
                    })
                });
            }
        } catch (error) {
            setSignupError(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style='dark' />
            <Text style={styles.title}>Create new account</Text>
            <InputField
                inputStyle={{
                    fontSize: 14
                }}
                containerStyle={{
                    backgroundColor: '#fff',
                    marginBottom: 20
                }}
                leftIcon='email'
                placeholder='Enter email'
                autoCapitalize='none'
                keyboardType='email-address'
                textContentType='emailAddress'
                autoFocus={true}
                value={email}
                onChangeText={(text: React.SetStateAction<string>) => setEmail(text)}
            />
            <InputField
                inputStyle={{
                    fontSize: 14
                }}
                containerStyle={{
                    backgroundColor: '#fff',
                    marginBottom: 20
                }}
                leftIcon='lock'
                placeholder='Enter password'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={passwordVisibility}
                textContentType='password'
                rightIcon={rightIcon}
                value={password}
                onChangeText={(text: React.SetStateAction<string>) => setPassword(text)}
                handlePasswordVisibility={handlePasswordVisibility}
            />
            {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}
            <Button
                onPress={onHandleSignup}
                color='#f57c00'
                title='Signup'
            />
            <RNButton
                onPress={() => navigation.navigate('Login')}
                title='Go to Login'
                color='#77ab12'
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e93b81',
        paddingTop: 50,
        paddingHorizontal: 12
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#fff',
        alignSelf: 'center',
        paddingBottom: 24
    }
});