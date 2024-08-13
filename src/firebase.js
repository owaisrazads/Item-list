// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAaRKSJanhz6e5cHm5lCiKimcl16UFH-bk",
    authDomain: "practice-firebase-d8c41.firebaseapp.com",
    projectId: "practice-firebase-d8c41",
    storageBucket: "practice-firebase-d8c41.appspot.com",
    messagingSenderId: "392425559970",
    appId: "1:392425559970:web:169eb3a487089f33f2c4fb",
    measurementId: "G-TDXSP4TX68"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
