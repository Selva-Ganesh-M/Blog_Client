// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebase_Api_Key } from "../utils/config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: firebase_Api_Key,
  authDomain: "blogapp-45586.firebaseapp.com",
  projectId: "blogapp-45586",
  storageBucket: "blogapp-45586.appspot.com",
  messagingSenderId: "287370675873",
  appId: "1:287370675873:web:9125a4405dac2046c092e0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
