import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';

import { AuthenticatedUserContext } from './AuthenticatedUserProvider';
import AuthenticationStack from "./AuthenticationStack";
import HomeStack from "./HomeStack";
import {QueueInfoContext, TrackContext, PlaylistContext, db} from "../constants";

const auth = db.auth();

export default function RootNavigator() {
    const { user, setUser } = useContext<any>(AuthenticatedUserContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // onAuthStateChanged returns an unsubscriber
        const unsubscribeAuth = auth.onAuthStateChanged(async authenticatedUser => {
            try {
                await (authenticatedUser ? setUser(authenticatedUser) : setUser(null));
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        });

        // unsubscribe auth listener on unmount
        return unsubscribeAuth;
    }, []);

    const [queue, setQueue] = React.useState();
    const [queueInfo, setQueueInfo] = React.useState({
        mpActive: false,
        queuePos: 0,
        trackTitle: "",
        trackImage: "",
        trackPlaylist: "",
    });
    const [playlists, setPlaylists] = React.useState<any[]>([]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {user ? <TrackContext.Provider value={{queue, setQueue}}>
                        <QueueInfoContext.Provider value={{queueInfo, setQueueInfo}}>
                            <PlaylistContext.Provider value={{playlists, setPlaylists}}>
                                <HomeStack/>
                            </PlaylistContext.Provider>
                        </QueueInfoContext.Provider>
                    </TrackContext.Provider> : <AuthenticationStack />}
        </NavigationContainer>
    );
}
