import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";

import BottomTabNavigation from "./BottomTabNavigation";
import SettingScreen from "../screens/SettingScreen";
import SoundboardListScreen from "../screens/SoundboardListScreen";
import SoundboardScreen from "../screens/SoundboardScreen";

const Stack = createStackNavigator();

export default function StackNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={"Default"} component={ BottomTabNavigation } options={{headerShown: false}}/>
                <Stack.Screen name={"Settings"} component={ SettingScreen }/>
                <Stack.Screen name="Soundboards" component={SoundboardListScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Soundboard" component={SoundboardScreen} options={{
                    headerTintColor: "#F4963F",
                    headerTitle: "",
                    headerStyle: {
                        backgroundColor: "#121212",
                        borderColor: "#121212",
                    } 
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}