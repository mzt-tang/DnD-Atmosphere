import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyDtjllzE-xUGxZHIQcSFOIgLRCnKmwqsj4",

    authDomain: "dnd-atmosphere-5c555.firebaseapp.com",

    projectId: "dnd-atmosphere-5c555",

    storageBucket: "dnd-atmosphere-5c555.appspot.com",

    messagingSenderId: "10537823461",

    appId: "1:10537823461:web:4355c34a91ec9f7ac2380c",

    measurementId: "G-WL0VNC30GS"

};

const getFirebase = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }else {
        firebase.app(); // if already initialized, use that one
    }
    return firebase;
}

export const db = getFirebase();