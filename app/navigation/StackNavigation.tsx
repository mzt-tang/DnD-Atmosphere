import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";

import BottomTabNavigation from "./BottomTabNavigation";
import SettingScreen from "../screens/SettingScreen";
import SoundboardScreen from "../screens/SoundboardScreen";
import PlaylistScreen from "../screens/PlaylistScreen";
import MusicPlayerScreen from "../screens/MusicPlayerScreen";

const Stack = createStackNavigator();

export default function StackNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                    headerTintColor: "#F4963F",
                    headerTitle: "",
                    headerStyle: {
                        backgroundColor: "#121212",
                        borderColor: "#121212",
                    } 
                }}>
                <Stack.Screen name="Default" component={ BottomTabNavigation } options={{headerShown: false}}/>
                <Stack.Screen name="Settings" component={ SettingScreen }/>
                <Stack.Screen name="Playlist" component={PlaylistScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Soundboard" component={SoundboardScreen}/>
                <Stack.Screen name="MusicPlayer" component={MusicPlayerScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}