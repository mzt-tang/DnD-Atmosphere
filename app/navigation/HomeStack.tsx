import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import BottomTabNavigation from "./BottomTabNavigation";
import SoundboardScreen from "../screens/SoundboardScreen";
import {MusicPlayerScreenController, PlaylistScreenController} from "../screenControllers";
import { LogBox } from 'react-native';

const Stack = createStackNavigator();

export default function HomeStack() {

    LogBox.ignoreLogs(['Setting a timer']);

    return (
        <Stack.Navigator screenOptions={{
                headerTintColor: "#F4963F",
                headerTitle: "",
                headerStyle: {
                    backgroundColor: "#121212",
                    borderColor: "#121212",
                }
            }}>
            <Stack.Screen name="Default" component={ BottomTabNavigation } options={{headerShown: false}}/>
            <Stack.Screen name="Playlist" component={PlaylistScreenController} options={{headerShown: false}}/>
            <Stack.Screen name="Soundboard" component={SoundboardScreen}/>
            <Stack.Screen name="MusicPlayer" component={MusicPlayerScreenController}/>
        </Stack.Navigator>
    )
}