import React from "react";
import firebase from "firebase";
import {View} from "react-native";

import {SoundboardListScreen} from "../screens";
import {QueueInfoContext} from "../constants";
import {MiniPlayer, PlaylistButton, } from "../components";

export default function SoundboardsScreenController({navigation}: any) {
    const {queueInfo, setQueueInfo} = React.useContext(QueueInfoContext);
    const [soundboards, setSoundboards] = React.useState<any[]>([])

    React.useEffect(() => {
        loadFromDatabase();
    }, []);

    async function loadFromDatabase() {
        const playlistsCollection = await firebase.firestore().collection("soundeffect-categories").get();

        let i = 0;
        let tempSoundboards: any[] = [];
        let row: any[] = [];
        playlistsCollection.docs.forEach(doc => {
            const image = doc.data().image;
            console.log(doc.id);

            row.push({
                title: doc.id,
                source: {uri: image},
                key: i,
            });
            if (i%2===1) {
                tempSoundboards.push(row);
                row = [];
            }
            i++;
        });
        if (row.length > 0) {
            tempSoundboards.push(row);
        }

        setSoundboards(tempSoundboards);
        console.log("done loading", soundboards);

    }

    function navToSoundboard(){
        navigation.navigate("Soundboard");
    }

    const playlistController = ({navigation}:any) => {
        return soundboards.map(row =>
            <View style={{
                width: "100%",
                flexDirection: "row",
                marginBottom: 10,
                justifyContent: "flex-start"}}
                  key={"r" + row[0].key}>
                {row.map((soundboard: any) =>
                    <PlaylistButton
                        source={soundboard.source}
                        title={soundboard.title}
                        navigation={navigation}
                        key={soundboard.key}
                        navTo="Soundboard"
                    />
                )}
            </View>
        )
    }

    const miniplayerController = ({navigation}:any) => {
        return queueInfo.mpActive && <MiniPlayer navigation={navigation}/>
    }

    return (
        <SoundboardListScreen
            playlistController={playlistController({navigation})}
            miniplayerController={miniplayerController({navigation})}
        />
    )
}