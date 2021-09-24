import React from "react";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreenController from "../screenControllers/HomeScreenController";
import SearchScreen from "../screens/SearchScreen";
import Search from "../components/Search";
import { MaterialIcons } from "@expo/vector-icons";
import {LibraryScreenController, SoundboardsScreenController} from "../screenControllers";


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
                component={HomeScreenController}
                options={{
                    tabBarIcon: ({color}) => <MaterialIcons name="home" color={color} size={35} />
                }}/>
            <Tab.Screen
                name={"Search"}
                component={SearchScreen}
                options={{
                    tabBarIcon: ({color}) => <MaterialIcons name="search" color={color} size={35} />
                }}/>
            <Tab.Screen
                name="Soundtracks"
                component={LibraryScreenController}
                options={{
                    tabBarIcon: ({color}) => <MaterialIcons name="library-music" color={color} size={35} />
                }}/>
            <Tab.Screen
                name="Soundboards"
                component={SoundboardsScreenController}
                options={{
                    tabBarIcon: ({color}) => <MaterialIcons name="grid-view" color={color} size={35} />
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