import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBXxfkl2Mx6wTNVVL39_rLXjThGek_o-aw",
  authDomain: "ssfkaniyath-8e0a7.firebaseapp.com",
  projectId: "ssfkaniyath-8e0a7",
  storageBucket: "ssfkaniyath-8e0a7.appspot.com",
  messagingSenderId: "1066970203885",
  appId: "1:1066970203885:web:37db466c2b4fc122566ee4",
  measurementId: "G-WVP1H4WZ9E"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)