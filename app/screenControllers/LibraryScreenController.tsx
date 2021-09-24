import React from "react";
import {View} from "react-native";

import {MiniPlayer, PlaylistButton} from "../components";
import firebase from "firebase/app";
import {LibraryScreen} from "../screens";
import {QueueInfoContext} from "../constants";

export default function LibraryScreenController({navigation} : any) {
    const {queueInfo, setQueueInfo} = React.useContext(QueueInfoContext);
    const [playlists, setPlaylists] = React.useState<any[]>([]);

    React.useEffect(() => {
        loadFromDatabase({setPlaylists});
    }, []);

    /**
     * Transforms the playlist data into PlaylistButton components
     */
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

    /**
     * Only returns a MiniPlayer component if the MiniPlayer has been activated yet
     * @param navigation The stack navigation because MiniPlayer needs access to the MusicPlayerScreen
     */
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

/**
 * Loads the playlists from the databse, tranforms into objects which are then stored
 * in the playlists state for the view to use.
 */
async function loadFromDatabase({setPlaylists}:any) {
    const playlistsCollection = await firebase.firestore().collection("soundtrack-categories").get();

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
