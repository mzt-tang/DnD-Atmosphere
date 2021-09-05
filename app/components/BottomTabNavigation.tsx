import React from "react";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LibraryScreen from "../screens/LibraryScreen";
import HomeScreen from "../screens/HomeScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Settings" component={LibraryScreen} />
    </Tab.Navigator>
);
}