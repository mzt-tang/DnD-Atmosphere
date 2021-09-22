import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View, Button as RNButton, Button} from 'react-native';

import {InputField} from "../components";

export const SignupScreen = ({email, setEmail, passwordVisibility, rightIcon, password, setPassword,
                          handlePasswordVisibility, onHandleSignupError, onHandleSignup, navigateToLogin}: any) => {
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
            {onHandleSignupError}
            <Button
                onPress={onHandleSignup}
                color='#f57c00'
                title='Signup'
            />
            <RNButton
                onPress={navigateToLogin}
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