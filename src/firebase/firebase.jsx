// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBShxULsM6ICme75H1TitjSF7Lh-pN1NX0",
  authDomain: "sce-movie-social.firebaseapp.com",
  projectId: "sce-movie-social",
  storageBucket: "sce-movie-social.appspot.com",
  messagingSenderId: "1077333995909",
  appId: "1:1077333995909:web:b4fdc8a279236ec6b654ec",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
