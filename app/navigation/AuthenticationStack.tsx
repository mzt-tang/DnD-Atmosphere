import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {SignupScreenController, LoginScreenController} from '../screenControllers';

const Stack = createStackNavigator();

export default function AuthenticationStack() {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='Login' component={LoginScreenController} />
            <Stack.Screen name='Signup' component={SignupScreenController} />
        </Stack.Navigator>
    );
}