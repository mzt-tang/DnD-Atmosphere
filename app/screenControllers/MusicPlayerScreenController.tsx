import React from "react";
import {Audio, AVPlaybackStatus} from "expo-av";

import {QueueInfoContext, TrackContext} from "../constants";
import {MusicPlayerScreen} from "../screens";
import {loadSoundMusicPlayer} from "../domainFunctions/domainFunctions";

export default function MusicPlayerScreenController({route}: any) {
    const [sound, setSound] = React.useState<Audio.Sound>();
    const [playing, setPlaying] = React.useState<boolean>(false);
    const [position, setPosition] = React.useState<number>(0);
    const [duration, setDuration] = React.useState<number>(0);
    const {queue} = React.useContext(TrackContext);
    const {queueInfo} = React.useContext(QueueInfoContext);

    React.useEffect(() => {
        loadSoundMusicPlayer({
            queue,
            queueInfo,
            setSound,
            onPlaybackStatusChanged,
            setPlaying,
            setDuration
        }).then().catch();
    }, []);


    /**
     * Switches if the playing state of the soundtrack
     */
    function playSound() {
        if (!playing){
            sound?.setStatusAsync({shouldPlay: true});
            setPlaying(true);
        } else {
            sound?.setStatusAsync({shouldPlay: false});
            setPlaying(false);
        }
    }

    /**
     * Updates the current soundtrack position each time it changes
     * @param playbackStatus The current soundtrack audio playback object
     */
    function onPlaybackStatusChanged(playbackStatus: AVPlaybackStatus){
        if (playbackStatus.isLoaded){
            setPosition(playbackStatus.positionMillis);
        }
    }

    /**
     * Converts milliseconds to a formatted string of a time stamp
     * @param millis milliseconds to convert
     */
    function millisToTimestamp(millis : number) {
        const date = new Date(millis);
        let seconds = "" + date.getSeconds();
        if (date.getSeconds() < 10) {
            seconds = "0" + seconds;
        }
        return date.getMinutes() + ":" + seconds;
    }

    //Unloads the sound
    React.useEffect(() => {
        return sound
            ? () => {
                sound?.setOnPlaybackStatusUpdate(null);
            }
            : undefined;
    }, []);

    return (
        <MusicPlayerScreen
            queueInfo={queueInfo}
            position={position}
            duration={duration}
            millisToTimestamp={millisToTimestamp}
            playSound={playSound}
            playing={playing}
        />
    )
}