import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import {StyleSheet, Text, View, Button as RNButton, Button} from 'react-native';

import {db} from "../constants/Firebase";
import {InputField, ErrorMessage} from "../components";

const auth = db.auth();

export const LoginScreen = ({email, setEmail, passwordVisibility, rightIcon, password, setPassword,
                                handlePasswordVisibility, handleOnLoginError, onLogin, navigateToSignup}:any) => {
    return (
        <View style={styles.container}>
            <StatusBar style='dark' />
            <Text style={styles.title}>Login</Text>
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
            {handleOnLoginError}
            <Button
                onPress={onLogin}
                color='#f57c00'
                title='Login'
            />
            <RNButton
                onPress={navigateToSignup}
                color='#77ab12'
                title='Go to Signup'
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
