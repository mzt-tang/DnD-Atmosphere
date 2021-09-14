import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import SoundboardListScreen from "../screens/SoundboardListScreen";
import SoundboardScreen from "../screens/SoundboardScreen";
import { RevealFromBottomAndroid } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets";

const Stack = createStackNavigator();

const SoundboadListOptions = {
    
}

export default function SoundBoardNavigation() {
    return (
        <Stack.Navigator initialRouteName="Soundboards">
            <Stack.Screen name="Soundboards" component={SoundboardListScreen} options={{
                headerShown: false, 
            }} />
            <Stack.Screen name="Soundboard" component={SoundboardScreen} options={{
                headerTintColor: "#F4963F",
                headerTitle: "",
                headerStyle: {
                    backgroundColor: "#121212",
                    borderColor: "#121212",
                } 
            }} />
        </Stack.Navigator>
    )};
