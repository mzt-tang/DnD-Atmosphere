import React from 'react';
import { useState } from 'react';

import ErrorMessage from "../components/ErrorMessage";
import {db} from "../constants";
import {SignupScreen} from "../screens";

const auth = db.auth();

/**
 * Signup controller
 * @param navigation
 * @constructor
 */
export default function SignupScreenController({ navigation }:any) {
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

    /**
     * Sign up, also creates by default a recently played soundtrack and effects playlist to tavern.
     */
    const onHandleSignup = async () => {
        try {
            if (email !== '' && password !== '') {
                await auth.createUserWithEmailAndPassword(email, password).then(cred => {
                    return db.firestore().collection('users').doc(cred.user?.uid).set({
                        recentlyPlayedSoundtracks: "Tavern",
                        recentlyPlayedSoundEffects: "Tavern",
                    })
                });
            }
        } catch (error) {
            setSignupError(error.message);
        }
    };

    const navigateToLogin = () => {
        navigation.navigate('Login');
    }

    const onHandleSignupError = () => {
        return signupError ? <ErrorMessage error={signupError} visible={true} /> : null;
    }

    return <SignupScreen
        email={email}
        setEmail={setEmail}
        passwordVisibility={passwordVisibility}
        rightIcon={rightIcon}
        password={password}
        setPassword={setPassword}
        handlePasswordVisibility={handlePasswordVisibility}
        onHandleSignupError={onHandleSignupError()}
        onHandleSignup={onHandleSignup}
        navigateToLogin={navigateToLogin}
    />
}