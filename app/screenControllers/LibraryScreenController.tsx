import React from "react";
import {View} from "react-native";

import {MiniPlayer, PlaylistButton} from "../components";
import {LibraryScreen} from "../screens";
import {QueueInfoContext} from "../constants";
import {loadFromDatabase} from "../domainFunctions/domainFunctions";

/**
 * soundtrack library screen presenter
 * @param navigation
 * @constructor
 */
export default function LibraryScreenController({navigation} : any) {
    const {queueInfo} = React.useContext(QueueInfoContext);
    const [playlists, setPlaylists] = React.useState<any[]>([]);

    React.useEffect(() => {
        loadFromDatabase({setPlaylists}, "soundtrack-categories").then().catch();
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
