import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";

import BottomTabNavigation from "./BottomTabNavigation";
import SettingScreen from "../screens/SettingScreen";

const Stack = createStackNavigator();

export default function StackNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={"Default"} component={ BottomTabNavigation } options={{headerShown: false}}/>
                <Stack.Screen name={"Settings"} component={ SettingScreen }/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}