import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDy9XZPyWhfQyZxFvbcdiDAPF2iyYu5ZU8",
    authDomain: "react-native-note-ee407.firebaseapp.com",
    projectId: "react-native-note-ee407",
    storageBucket: "react-native-note-ee407.appspot.com",
    messagingSenderId: "1079064857674",
    appId: "1:1079064857674:web:2236fd0c69466913bdeab3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };