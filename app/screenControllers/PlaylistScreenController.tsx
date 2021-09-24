import React from "react";

import {MiniPlayer, Soundtrack} from "../components";
import {PlaylistScreen} from "../screens";
import {loadSoundtrackData, onTrackPress} from "../domainFunctions/domainFunctions";
import {TrackContext, QueueInfoContext} from "../constants";
import {AuthenticatedUserContext} from "../navigation/AuthenticatedUserProvider";

/**
 * playlist screen presenter
 * @param navigation
 * @param route
 * @constructor
 */
export default function PlaylistScreenController({navigation, route}: any) {
    const {queue, setQueue} = React.useContext(TrackContext);
    const {queueInfo, setQueueInfo} = React.useContext(QueueInfoContext);
    const { user } = React.useContext<any>(AuthenticatedUserContext);
    const [soundtracks, setSoundtracks] = React.useState<any[]>([]);

    React.useEffect(() => {
        loadSoundtrackData({route, setSoundtracks}).then();
    }, []);


    /**
     * Transforms the playlist data into Soundtrack components
     */
    const playlistController = () => {
        return soundtracks.map(soundtrack =>
            <Soundtrack
                title={soundtrack.title}
                onTrackPress={onTrackPress}
                key={soundtrack.key}
                trackObject={soundtrack}
                playlistObject={route.params}
                queue={queue}
                queueInfo={queueInfo}
                setQueue={setQueue}
                setQueueInfo={setQueueInfo}
                navigation={navigation}
                userId={user.uid}
            />);
    }

    /**
     * Goes back to the LibarayScreen
     * @param navigation HomeStack navigator
     */
    const onNavGoBack = ({navigation}: any) => {
        return navigation.goBack;
    }

    /**
     * Only returns a MiniPlayer component if the MiniPlayer has been activated yet
     * @param navigation The stack navigation because MiniPlayer needs access to the MusicPlayerScreen
     */
    const miniplayerController = ({navigation}: any) => {
        return queueInfo.mpActive && <MiniPlayer navigation={navigation}/>
    }

    return (
        <PlaylistScreen
            route={route}
            onNavGoBack={onNavGoBack({navigation})}
            queueInfo={queueInfo}
            playlistController={playlistController()}
            miniplayerController={miniplayerController({navigation})}
        />
    );
}
