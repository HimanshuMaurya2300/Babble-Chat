import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA6wZ8y9JmHF_Ku9TsilQ59Ukn-AHVbvZo",
    authDomain: "fir-chat-app-e982c.firebaseapp.com",
    projectId: "fir-chat-app-e982c",
    storageBucket: "fir-chat-app-e982c.appspot.com",
    messagingSenderId: "495977345710",
    appId: "1:495977345710:web:f6aba9f9c957ef0c2cb33f"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)
