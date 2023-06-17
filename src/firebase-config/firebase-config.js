// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getDatabase} from 'firebase/database'



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCUVwlIdchXr6zNtITrd25XM3z7Bpbhvg",
  authDomain: "shopazon-caf9f.firebaseapp.com",
  projectId: "shopazon-caf9f",
  storageBucket: "shopazon-caf9f.appspot.com",
  messagingSenderId: "1072797283385",
  appId: "1:1072797283385:web:be3089c22542f0cd5dc9e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
