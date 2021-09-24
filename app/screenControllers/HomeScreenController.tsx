import React from "react";

import {MiniPlayer} from "../components";
import {QueueInfoContext} from "../constants";
import {AuthenticatedUserContext} from "../navigation/AuthenticatedUserProvider";
import {getRecentlyPlayed} from "../domainFunctions/domainFunctions";
import {HomeScreen} from "../screens";

export default function HomeScreenController({navigation}: any) {
    const {queueInfo} = React.useContext(QueueInfoContext);
    const { user } = React.useContext<any>(AuthenticatedUserContext);
    const [recentTrack, setRecentTrack] = React.useState<any>({});
    const [recentBoard, setRecentBoard] = React.useState<any>({});

    React.useEffect(() => {
        getRecentlyPlayed({setRecentTrack, setRecentBoard}, user.uid).then();
    }, []);

    /**
     * Only returns a MiniPlayer component if the MiniPlayer has been activated yet
     * @param navigation The stack navigation because MiniPlayer needs access to the MusicPlayerScreen
     */
    const miniplayerController = ({navigation}:any) => {
        return queueInfo.mpActive && <MiniPlayer navigation={navigation}/>
    }

    return (
        <HomeScreen
            email={user.email}
            recentTrack={recentTrack}
            recentBoard={recentBoard}
            miniplayerController={miniplayerController({navigation})}
            navigation={navigation}
        />
    );
}