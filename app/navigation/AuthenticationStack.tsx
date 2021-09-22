import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import SignupScreenController from '../screenControllers/SignupScreenController';

const Stack = createStackNavigator();

export default function AuthenticationStack() {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Signup' component={SignupScreenController} />
        </Stack.Navigator>
    );
}