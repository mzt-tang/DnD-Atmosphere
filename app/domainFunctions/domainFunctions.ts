import {db} from "../constants";
import {Audio} from "expo-av";
import firebase from "firebase";

// Authentication
const auth = db.auth();

/**
 * Sign out
 */
export const handleSignOut = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        console.log(error);
    }
};

//Music Player
/**
 * Sets up the music player initial states
 * @param param0 getters and setters for the states
 */
export async function loadSoundMusicPlayer({queue, queueInfo, setSound, onPlaybackStatusChanged, setPlaying, setDuration}: any) {
    //Get the current soundtrack
    const soundObject = queue[queueInfo.queuePos];
    setSound(soundObject);

    //Setup event listener
    soundObject.setOnPlaybackStatusUpdate(onPlaybackStatusChanged);

    //Set playing and duration states
    const status = await soundObject.getStatusAsync();
    if (status.isLoaded) {
        setPlaying(status.isPlaying);
        setDuration(status.durationMillis);
    }
}

//Playlist Library/Soundboard list
/**
 * Loads the playlists from the database, transforms into objects which are then stored
 * in the playlists state for the view to use.
 */
export async function loadFromDatabase({setPlaylists}:any, soundType: string) {
    const playlistsCollection = await firebase.firestore().collection(soundType).get();

    let i = 0;
    // 2D list since the playlists need to be put in rows
    let tempPlaylists: any[] = [];
    let row: any[] = [];
    playlistsCollection.docs.forEach(doc => {
        const image = doc.data().image;

        row.push({
            title: doc.id,
            source: {uri: image},
            key: i,
        });

        // Evert 2nd iteration, push this row and start a new one
        if (i%2===1) {
            tempPlaylists.push(row);
            row = [];
        }
        i++;
    });

    // This is so that the last playlist will still be added if there is an odd number of playlists
    if (row.length > 0) {
        tempPlaylists.push(row);
    }

    setPlaylists(tempPlaylists);
}

//Playlist Screen
/**
 * Loads the soundtrack data which is then transformed into objects and stored in the soundtracks state.
 * @param route route data which is passed by the HomeStack navigator
 * @param setSoundtracks the setter for the soundtracks state
 */
 export async function loadSoundtrackData({route, setSoundtracks}:any) {
    const soundtrackCollection = await db.firestore().collection("soundtrack-categories").doc(route.params.playlist).get();
    const tracks = soundtrackCollection.data()?.tracks;

    let tempSoundtracks: any[] = [];
    for (let i = 0; i < tracks.length; i++){
        let track = await tracks[i].get();
        track = track.data();

        //Set the object to the data from the database plus a unique key
        track = {...track, key: i};
        tempSoundtracks.push(track);
    }

    setSoundtracks(tempSoundtracks);
}

/**
 * Called when a soundtrack is pressed.
 * 
 * @param trackObject track object of the soundtrack
 * @param playlistObject playlist object that the soundtrack is from
 * @param queue queue context
 * @param queueInfo queueInfo context
 * @param setQueue queue context setter
 * @param setQueueInfo queueInfo context setter
 * @param navigation HomeStack navigator
 * @param userId the current user id
 */
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

/**
 * Sets the users most recently played playlist to the current playlist in the database.
 * 
 * @param playlistId id of the playlist of the soundtrack that is playing
 * @param userId id of the current user
 */
async function updateRecentlyPlayed(playlistId: string, userId: string) {
    return db.firestore().collection('users').doc(userId).update({
        recentlyPlayedSoundtracks: playlistId
    })
}

/**
 * Load the passed soundtrack by updating the queue context.
 * 
 * @param trackObject soundtrack object to be loaded
 * @param playListObject playlist object of the soundtrack (the playlist the soundtrack is inside)
 * @param queue queue context
 * @param queueInfo queueInfo context
 * @param setQueue queue context setter
 * @param setQueueInfo queueInfo context setter
 */


async function loadPlaylistAudio({trackObject, playlistObject, queue, queueInfo, setQueue, setQueueInfo}:any) {
    // Unload the last played soundtrack unless there isn't one
    if (queueInfo.mpActive){
        queue[queueInfo.queuePos]?.unloadAsync();
    }

    // Load the passed soundtrack
    const playlist:Audio.Sound[] = [];
    const { sound: soundObject} = await Audio.Sound.createAsync({uri: trackObject.link});
    playlist.push(soundObject);

    // Update global contexts
    setQueue(playlist);
    setQueueInfo({
        ...queueInfo,
        mpActive: true,
        trackTitle: trackObject.title,
        trackImage: playlistObject.imageSource,
        trackPlaylist: playlistObject.playlist
    });
}

//Board Screen
/**
 * Loads the sound effect data which is then transformed into objects and stored in the sounds state.
 * @param route route data which is passed by the HomeStack navigator
 * @param setSounds the setter for the soundtracks state
 */
export async function loadSoundEffectData({route, setSounds}: any) {
    const soundtrackCollection = await firebase.firestore().collection("soundeffect-categories").doc(route.params.playlist).get();
    const effects = await soundtrackCollection.data()?.effects;

    // 2D list because there are multiple rows of sounds
    let tempSounds: any[] = [];
    let row = [];
    for (let i = 0; i < effects.length; i++){
        let effect = await effects[i].get();
        effect = effect.data();

        // Set the object to the data from the database plus a unique key
        effect = {...effect, key: i};
        row.push(effect);

        // Every 3rd (or the final) iteration push this row and start a new one
        if (i%3 === 2 || i === effects.length-1) {
            tempSounds.push(row);
            row = [];
        }
    }

    setSounds(tempSounds);
}

//Home Screen
export async function getRecentlyPlayed({setRecentTrack, setRecentBoard}: any, userId: string) {
    const userDoc = db.firestore().collection('users').doc(userId);
    userDoc.onSnapshot(async snapshot => {
        const soundtrack = await snapshot.data()?.recentlyPlayedSoundtracks;
        const soundBoard = await snapshot.data()?.recentlyPlayedSoundEffects;
        const trackRef = await db.firestore().collection('soundtrack-categories').doc(soundtrack).get();
        const boardRef = await db.firestore().collection('soundeffect-categories').doc(soundBoard).get();

        console.log(trackRef.data()?.image);
        console.log(boardRef.data()?.image);
        setRecentTrack({title: trackRef.id, source: trackRef.data()?.image});
        setRecentBoard({title: boardRef.id, source: boardRef.data()?.image});
    });
}

// Sound
/**
 * Plays a sound effect
 */
export async function playSound({sound, playlistId, userId}: any) {
    await updateRecentlyPlayedEffects(playlistId, userId);
    await sound?.replayAsync(); //if not null play sound
}

/**
 * Loads a single sound effect
 */
export async function loadSound({setSound, audioSource, setDuration}:any) {
    console.log('Loading Sound');
    const {sound , status} = await Audio.Sound.createAsync({uri: audioSource});

    setSound(sound);
    if (status.isLoaded) {
        setDuration(status.durationMillis as number);
    }
}

/**
 * Sets the users most recently played soundboard to the current playlist in the database.
 * 
 * @param playlistId id of the playlist of the soundtrack that is playing
 * @param userId id of the current user
 */
async function updateRecentlyPlayedEffects(playlistId: string, userId: string) {
    return db.firestore().collection('users').doc(userId).update({
        recentlyPlayedSoundEffects: playlistId
    })
}