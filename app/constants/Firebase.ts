import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/storage';
import 'firebase/auth';
import {configKeys} from "./ConfigKeys";

export const initialiseFirebase = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(configKeys);
    }else {
        firebase.app(); // if already initialized, use that one
    }
    return firebase;
}

export const db = initialiseFirebase();