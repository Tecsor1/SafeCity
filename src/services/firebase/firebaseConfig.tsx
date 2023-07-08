// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2v4uGH4C7pffMeb51e8-UXcv1f90Lchg",
  authDomain: "ropadon-66562.firebaseapp.com",
  projectId: "ropadon-66562",
  storageBucket: "ropadon-66562.appspot.com",
  messagingSenderId: "556483273672",
  appId: "1:556483273672:web:45d4378a7d1ef2a246d6fd",
  measurementId: "G-Y7CMXGX4YH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth(app);

export {
  database,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
};
