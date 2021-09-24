import React from "react";
import firebase from "firebase";
import {View} from "react-native";

import {SoundboardListScreen} from "../screens";
import {QueueInfoContext} from "../constants";
import {MiniPlayer, PlaylistButton, } from "../components";
import {loadFromDatabase} from "../domainFunctions/domainFunctions";

export default function SoundboardsScreenController({navigation}: any) {
    const {queueInfo} = React.useContext(QueueInfoContext);
    const [playlists, setPlaylists] = React.useState<any[]>([])

    React.useEffect(() => {
        loadFromDatabase({setPlaylists}, "soundeffect-categories").then().catch();
    }, []);

    /**
     * Transforms the soundboard data into PlaylistButton components
     */
    const playlistController = ({navigation}:any) => {
        return playlists.map(row =>
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