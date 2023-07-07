// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZqW1SrJfhFdBA7DsD3SWtpHKpSIfqWzk",
  authDomain: "computacionmovil-df4d5.firebaseapp.com",
  projectId: "computacionmovil-df4d5",
  storageBucket: "computacionmovil-df4d5.appspot.com",
  messagingSenderId: "945101501286",
  appId: "1:945101501286:web:adb4df2a6a80cd166f0ea7",
  measurementId: "G-EQ86NKE86F",
  databaseURL: "https://computacionmovil-df4d5-default-rtdb.firebaseio.com/",
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
