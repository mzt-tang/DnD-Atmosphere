import React from "react";
import firebase from "firebase";
import {View} from "react-native";

import {MiniPlayer, Sound} from "../components";
import {BoardScreen} from "../screens";
import {QueueInfoContext} from "../constants";

export default function BoardScreenController({route, navigation}: any) {
    const {queueInfo, setQueueInfo} = React.useContext(QueueInfoContext);
    const [sounds, setSounds] = React.useState<any[]>([]);

    React.useEffect(() => {
        loadSoundtrackData().then();
    }, []);

    async function loadSoundtrackData() {
        const soundtrackCollection = await firebase.firestore().collection("soundeffect-categories").doc(route.params.playlist).get();
        const effects = await soundtrackCollection.data()?.effects;

        let tempSounds: any[] = [];
        let row = [];
        let i = 0;
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

    const playlistController = () => {
        return sounds.map(row =>
            <View style={{
                width: "100%",
                flexDirection: "row",
                marginBottom: 20,
                justifyContent: "flex-start",
                }} key={"r" + row[0].key}>
                {row.map((sound: any) =>

                    <Sound title={sound.title} key={sound.key} audioSource={sound.link}/>
                )}
            </View>
        )
    }

    const miniplayerController = ({navigation}:any) => {
        return queueInfo.mpActive && <MiniPlayer navigation={navigation}/>
    }

    return (
        <BoardScreen
            route={route}
            playlistController={playlistController()}
            miniplayerController={miniplayerController({navigation})}
        />
    )
}