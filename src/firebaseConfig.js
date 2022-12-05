// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUIFpnm7bQUBxdyLV5yHjoPIHYLgZ4y0s",
  authDomain: "on-the-rocks-app.firebaseapp.com",
  projectId: "on-the-rocks-app",
  storageBucket: "on-the-rocks-app.appspot.com",
  messagingSenderId: "556957323903",
  appId: "1:556957323903:web:19c1942fe6c82666aae54a",
  measurementId: "G-W02FQXMKR5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// storage & auth
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);