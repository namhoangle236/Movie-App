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

  // apiKey: "AIzaSyDr1GK8oUbiem3-E-nTyFa0Vip2TGGmp5Y",
  // authDomain: "movie-app-f9082.firebaseapp.com",
  // projectId: "movie-app-f9082",
  // storageBucket: "movie-app-f9082.firebasestorage.app",
  // messagingSenderId: "529362177564",
  // appId: "1:529362177564:web:60750bf7e41780042859d9",
  // measurementId: "G-M3LB50KWSV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);