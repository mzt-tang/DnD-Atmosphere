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

    /**
     * Loads the soundboards from the databse, tranforms into objects which are then stored
     * in the playlists state for the view to use.
     */
    async function loadFromDatabase() {
        const playlistsCollection = await firebase.firestore().collection("soundeffect-categories").get();

        let i = 0;
        // 2D list since the soundboards need to be put in rows
        let tempSoundboards: any[] = [];
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
                tempSoundboards.push(row);
                row = [];
            }
            i++;
        });

        // This is so that the last soundboard will still be added if there is an odd number of soundboards
        if (row.length > 0) {
            tempSoundboards.push(row);
        }

        setSoundboards(tempSoundboards);
    }

    /**
     * Transforms the soundboard data into PlaylistButton components
     */
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

    /**
     * Only returns a MiniPlayer component if the MiniPlayer has been activated yet
     * @param navigation The stack navigation because MiniPlayer needs access to the MusicPlayerScreen
     */
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