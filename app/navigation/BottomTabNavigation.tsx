import React from "react";
import {StyleSheet} from "react-native";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LibraryScreen from "../screens/LibraryScreen";
import HomeScreen from "../screens/HomeScreen";
import SoundBoardListScreen from "../screens/SoundboardListScreen";
import TestScreenMichael from "../screens/TestScreenMichael"
import Search from "../components/Search";
import { MaterialIcons } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();

/**
 * The bottom tab navigation component and its settings.
 * @constructor .
 */
export default function BottomTabNavigation() {
    return (
        <Tab.Navigator initialRouteName={"Home"} tabBarOptions={tabBarStyle}>
            <Tab.Screen 
                name="Home" 
                component={HomeScreen}
                options={{
                    tabBarIcon: ({color}) => <MaterialIcons name="home" color={color} size={35} />
                }}/>
            <Tab.Screen 
                name="Soundtracks" 
                component={LibraryScreen} 
                options={{
                    tabBarIcon: ({color}) => <MaterialIcons name="library-music" color={color} size={35} />
                }}/>
            <Tab.Screen 
                name="Soundboards" 
                component={SoundBoardListScreen} 
                options={{
                    tabBarIcon: ({color}) => <MaterialIcons name="grid-view" color={color} size={35} />
                }}/>
            <Tab.Screen 
                name={"Search"} 
                component={Search} 
                options={{
                    tabBarIcon: ({color}) => <MaterialIcons name="search" color={color} size={35} />
                }}/>
        </Tab.Navigator>
    );
}

const tabBarStyle = {
    activeTintColor: "#F4963F",
    inactiveTintColor: "gray",
    style: {
        backgroundColor: "black", 
        height: 50,
    },
}