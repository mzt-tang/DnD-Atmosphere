import React from "react";

import {MiniPlayer, Soundtrack} from "../components";
import {PlaylistScreen} from "../screens";
import {loadSoundtrackData, onTrackPress} from "../domainFunctions/domainFunctions";
import {TrackContext, QueueInfoContext} from "../constants";
import {AuthenticatedUserContext} from "../navigation/AuthenticatedUserProvider";

export default function PlaylistScreenController({navigation, route}: any) {
    const {queue, setQueue} = React.useContext(TrackContext);
    const {queueInfo, setQueueInfo} = React.useContext(QueueInfoContext);
    const { user } = React.useContext<any>(AuthenticatedUserContext);
    const [soundtracks, setSoundtracks] = React.useState<any[]>([]);

    React.useEffect(() => {
        loadSoundtrackData({route, setSoundtracks}).then();
    }, []);


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

    const onNavGoBack = ({navigation}: any) => {
        return navigation.goBack;
    }

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
