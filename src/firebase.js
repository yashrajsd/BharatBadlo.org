import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDm2Qklubrw78jNG_jr8ckd5aE7GBtsrgc",
    authDomain: "changeorg-24a12.firebaseapp.com",
    projectId: "changeorg-24a12",
    storageBucket: "changeorg-24a12.appspot.com",
    messagingSenderId: "1061835888261",
    appId: "1:1061835888261:web:f996a5ea4c473349d9bbec"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)
