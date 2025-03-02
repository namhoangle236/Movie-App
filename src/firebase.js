// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDZA8AEo6LOscZWG2of_m7uhqrXKWirT8Q",
  authDomain: "movieapp-5d204.firebaseapp.com",
  projectId: "movieapp-5d204",
  storageBucket: "movieapp-5d204.firebasestorage.app",
  messagingSenderId: "759539462570",
  appId: "1:759539462570:web:304a201adb62122b093bd3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);