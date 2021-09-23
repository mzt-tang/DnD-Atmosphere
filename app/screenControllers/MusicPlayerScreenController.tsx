import React from "react";
import {Audio, AVPlaybackStatus} from "expo-av";

import {QueueInfoContext, TrackContext} from "../constants";
import {MusicPlayerScreen} from "../screens";

export default function MusicPlayerScreenController({route}: any) {
    const [sound, setSound] = React.useState<Audio.Sound>();
    const [playing, setPlaying] = React.useState<boolean>(false);
    const [position, setPosition] = React.useState<number>(0);
    const [duration, setDuration] = React.useState<number>(0);
    const {queue, setQueue} = React.useContext(TrackContext);
    const {queueInfo, setQueueInfo} = React.useContext(QueueInfoContext);

    React.useEffect(() => {
        loadSound();
    }, []);

    async function loadSound() {
        const soundObject = queue[queueInfo.queuePos];
        console.log("queue?: ", queue!==undefined);
        setSound(soundObject);

        soundObject.setOnPlaybackStatusUpdate(onPlaybackStatusChanged);
        const status = await soundObject.getStatusAsync();
        if (status.isLoaded) {
            setPlaying(status.isPlaying);
            setDuration(status.durationMillis);
            console.log("duration = ", status.durationMillis);
        }
    }

    function playSound() {
        console.log('Playing Soundtrack');
        console.log(sound !== undefined);

        if (!playing){
            sound?.setStatusAsync({shouldPlay: true});
            setPlaying(true);
        } else {
            sound?.setStatusAsync({shouldPlay: false});
            setPlaying(false);
        }
    }

    function onPlaybackStatusChanged(playbackStatus: AVPlaybackStatus){
        //console.log(playbackStatus);
        if (playbackStatus.isLoaded){
            setPosition(playbackStatus.positionMillis);
        }
    }

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
                console.log('Removing listener');
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