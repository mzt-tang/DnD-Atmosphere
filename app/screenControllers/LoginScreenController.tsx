import React from 'react';
import { useState } from 'react';

import {db} from "../constants/Firebase";
import {ErrorMessage} from "../components";
import {LoginScreen} from "../screens";

const auth = db.auth();

export default function LoginScreenController({ navigation }:any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');
    const [loginError, setLoginError] = useState('');

    const handlePasswordVisibility = () => {
        if (rightIcon === 'eye') {
            setRightIcon('eye-off');
            setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'eye-off') {
            setRightIcon('eye');
            setPasswordVisibility(!passwordVisibility);
        }
    };

    const onLogin = async () => {
        try {
            if (email !== '' && password !== '') {
                await auth.signInWithEmailAndPassword(email, password);
            }
        } catch (error) {
            setLoginError(error.message);
        }
    };

    const handleOnLoginError = () => {
        return loginError ? <ErrorMessage error={loginError} visible={true} /> : null;
    }

    const navigateToSignup = () => {
        navigation.navigate('Signup');
    }

    return (
        <LoginScreen
            email={email}
            setEmail={setEmail}
            passwordVisibility={passwordVisibility}
            rightIcon={rightIcon}
            password={password}
            setPassword={setPassword}
            handlePasswordVisibility={handlePasswordVisibility}
            handleOnLoginError={handleOnLoginError()}
            onLogin={onLogin}
            navigateToSignup={navigateToSignup}
        />
    );
}