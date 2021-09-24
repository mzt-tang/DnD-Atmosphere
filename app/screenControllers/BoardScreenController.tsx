import React from "react";
import {View} from "react-native";

import {MiniPlayer, Sound} from "../components";
import {BoardScreen} from "../screens";
import {QueueInfoContext} from "../constants";
import {loadSoundEffectData} from "../domainFunctions/domainFunctions";

export default function BoardScreenController({route, navigation}: any) {
    const {queueInfo, setQueueInfo} = React.useContext(QueueInfoContext);
    const [sounds, setSounds] = React.useState<any[]>([]);

    React.useEffect(() => {
        loadSoundEffectData({route, setSounds}).then();
    }, []);

    /**
     * Transforms the sound effect data into Sound components
     */
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
    
    /**
     * Only returns a MiniPlayer component if the MiniPlayer has been activated yet
     * @param navigation The stack navigation because MiniPlayer needs access to the MusicPlayerScreen
     */
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