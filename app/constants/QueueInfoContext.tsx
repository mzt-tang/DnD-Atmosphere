import {createContext} from "react";

/**
 * Global context that stores if the mini player is active, the current player queue postion and
 * current soundtrack infomation
 */
export const QueueInfoContext = createContext<any>({
    mpActive: false,
    queuePos: 0,
});