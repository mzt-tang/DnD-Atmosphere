import React from "react";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LibraryScreen from "../screens/LibraryScreen";
import HomeScreen from "../screens/HomeScreen";
import SoundBoardListScreen from "../screens/SoundboardListScreen"

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
    return (
        <Tab.Navigator initialRouteName={"Home"}>
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Library" component={LibraryScreen} />
            <Tab.Screen name="Soundboards" component={SoundBoardListScreen} />
        </Tab.Navigator>
);
}