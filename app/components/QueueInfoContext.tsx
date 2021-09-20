import {createContext} from "react";

export const QueueInfoContext = createContext<any>({
    mpActive: false,
    queuePos: 0,
});