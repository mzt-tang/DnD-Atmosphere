import React from "react";

import {MiniPlayer, Soundtrack} from "../components";
import {PlaylistScreen} from "../screens";
import {loadSoundtrackData, onTrackPress} from "../domainFunctions/playlistControllerFunctions";
import {TrackContext, QueueInfoContext} from "../constants";

export default function PlaylistScreenController({navigation, route}: any) {
    const {queue, setQueue} = React.useContext(TrackContext);
    const {queueInfo, setQueueInfo} = React.useContext(QueueInfoContext);
    const [soundtracks, setSoundtracks] = React.useState<any[]>([]);

    React.useEffect(() => {
        loadSoundtrackData({route, setSoundtracks});
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
