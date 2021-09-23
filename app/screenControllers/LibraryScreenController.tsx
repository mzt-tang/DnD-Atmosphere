import React from "react";
import {View} from "react-native";

import {MiniPlayer, PlaylistButton} from "../components";
import firebase from "firebase/app";
import {LibraryScreen} from "../screens";
import {QueueInfoContext} from "../constants";

export default function LibraryScreenController({navigation} : any) {
    const {queueInfo, setQueueInfo} = React.useContext(QueueInfoContext);
    const [playlists, setPlaylists] = React.useState<any[]>([])

    React.useEffect(() => {
        loadFromDatabase();
    }, []);

    async function loadFromDatabase() {
        const playlistsCollection = await firebase.firestore().collection("soundtrack-categories").get();

        let i = 0;
        let tempPlaylists: any[] = [];
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
                tempPlaylists.push(row);
                row = [];
            }
            i++;
        });
        if (row.length > 0) {
            tempPlaylists.push(row);
        }

        setPlaylists(tempPlaylists);
        console.log("done loading", playlists);
    }

    const playlistController = ({navigation}: any) => {
        return playlists.map(row =>
            <View style={{
                width: "100%",
                flexDirection: "row",
                marginBottom: 10,
                justifyContent: "flex-start"
            }} key={"r" + row[0].key}>
                {row.map((playlist: any) =>
                    <PlaylistButton
                        source={playlist.source}
                        title={playlist.title}
                        navigation={navigation}
                        key={playlist.key}
                        navTo="Playlist"
                    />
                )}
            </View>
        )
    }

    const miniplayerController = ({navigation}: any) => {
        return queueInfo.mpActive && <MiniPlayer navigation={navigation}/>
    }

    return (
        <LibraryScreen
            playlistController={playlistController({navigation})}
            miniplayerController={miniplayerController({navigation})}
        />
    );
}
