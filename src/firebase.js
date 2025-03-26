// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDr1GK8oUbiem3-E-nTyFa0Vip2TGGmp5Y",
  authDomain: "movie-app-f9082.firebaseapp.com",
  projectId: "movie-app-f9082",
  storageBucket: "movie-app-f9082.firebasestorage.app",
  messagingSenderId: "529362177564",
  appId: "1:529362177564:web:60750bf7e41780042859d9",
  measurementId: "G-M3LB50KWSV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);