// import { initializeApp } from "firebase/app"

import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const initializeFirebase = () => {
    console.log('app initialized--------');
    return initializeApp(firebaseConfig);
}

export default initializeFirebase;