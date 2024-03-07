// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth"
import { ReactNativeAsyncStorage } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYuRbnD7LacOd5jtYAzeF9_ymmQapoSBU",
  authDomain: "social-sphere-36f33.firebaseapp.com",
  projectId: "social-sphere-36f33",
  storageBucket: "social-sphere-36f33.appspot.com",
  messagingSenderId: "996235653511",
  appId: "1:996235653511:web:166c6cd15cdb5e18502322",
  measurementId: "G-KVXXPPL5BJ"
};

// Initialize Firebase
const FIREBASEAPP = initializeApp(firebaseConfig);
const analytics = getAnalytics(FIREBASEAPP);

initializeAuth(FIREBASEAPP, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
   })
   const db = getFirestore(FIREBASEAPP);
   const auth = getAuth(FIREBASEAPP);
    export { FIREBASEAPP, auth, db }
    


   