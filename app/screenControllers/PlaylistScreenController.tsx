import React from "react";
import {Audio} from "expo-av";

import {TrackContext, MiniPlayer, Soundtrack, QueueInfoContext} from "../components";
import {PlaylistScreen} from "../screens";
import firebase from "firebase/app";

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

async function loadSoundtrackData({route, setSoundtracks}:any) {
    const soundtrackCollection = await firebase.firestore().collection("soundtrack-categories").doc(route.params.playlist).get();
    const tracks = soundtrackCollection.data()?.tracks;

    let tempSoundtracks: any[] = [];
    for (let i = 0; i < tracks.length; i++){
        let track = await tracks[i].get();
        track = track.data();
        track = {...track, key: i};
        tempSoundtracks.push(track);
    }

    console.log("Done loading");
    setSoundtracks(tempSoundtracks);
}

async function onTrackPress(
    trackObject: any,
    playlistObject: any,
    queue: any,
    queueInfo: any,
    setQueue: any,
    setQueueInfo: any,
    navigation: any) {
    await loadPlaylistAudio({
        trackObject,
        playlistObject,
        queue,
        queueInfo,
        setQueue,
        setQueueInfo
    });
    navigation.navigate("MusicPlayer");

}

async function loadPlaylistAudio({trackObject, playlistObject, queue, queueInfo, setQueue, setQueueInfo}:any) {
    if (queueInfo.mpActive){
        console.log("Unloading queue 0")
        queue[queueInfo.queuePos]?.unloadAsync();
    }

    const playlist:Audio.Sound[] = [];
    const { sound: soundObject, status: soundStatus} = await Audio.Sound.createAsync({uri: trackObject.link});
    playlist.push(soundObject);

    setQueue(playlist);
    setQueueInfo({
        ...queueInfo,
        mpActive: true,
        trackTitle: trackObject.title,
        trackImage: playlistObject.imageSource,
        trackPlaylist: playlistObject.playlist
    });
}