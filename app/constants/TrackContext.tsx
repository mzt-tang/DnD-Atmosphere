import {createContext} from "react";

/**
 * Global context that stores the music queue which is a list of audio playback objects
 */
export const TrackContext = createContext<any>([]);

