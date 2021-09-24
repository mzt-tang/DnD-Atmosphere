import {db} from "../constants";
import {Audio} from "expo-av";
import firebase from "firebase";

export async function loadSoundtrackData({route, setSoundtracks}:any) {
    const soundtrackCollection = await db.firestore().collection("soundtrack-categories").doc(route.params.playlist).get();
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

export async function loadSoundEffectData({route, setSounds}: any) {
    const soundtrackCollection = await firebase.firestore().collection("soundeffect-categories").doc(route.params.playlist).get();
    const effects = await soundtrackCollection.data()?.effects;

    let tempSounds: any[] = [];
    let row = [];
    for (let i = 0; i < effects.length; i++){
        let track = await effects[i].get();
        track = track.data();
        track = {...track, key: i};
        row.push(track);
        if (i%3 === 2 || i === effects.length-1) {
            tempSounds.push(row);
            row = [];
        }
    }

    console.log("Done loading");
    setSounds(tempSounds);
}

export async function onTrackPress(
    trackObject: any,
    playlistObject: any,
    queue: any,
    queueInfo: any,
    setQueue: any,
    setQueueInfo: any,
    navigation: any,
    userId: string) {

    await updateRecentlyPlayed(playlistObject.playlist, userId);

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

async function updateRecentlyPlayed(playlistId: string, userId: string) {
    return db.firestore().collection('users').doc(userId).update({
        recentlyPlayedSoundtracks: playlistId
    })
}

export async function loadPlaylistAudio({trackObject, playlistObject, queue, queueInfo, setQueue, setQueueInfo}:any) {
    if (queueInfo.mpActive){
        console.log("Unloading queue 0")
        queue[queueInfo.queuePos]?.unloadAsync();
    }

    const playlist:Audio.Sound[] = [];
    const { sound: soundObject} = await Audio.Sound.createAsync({uri: trackObject.link});
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