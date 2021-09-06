import React from "react";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LibraryScreen from "../screens/LibraryScreen";
import HomeScreen from "../screens/HomeScreen";
import {NavigationContainer} from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation({navigation}: any) {
    return (
        <Tab.Navigator initialRouteName={"Home"}>
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Library" component={LibraryScreen} />
        </Tab.Navigator>
);
}