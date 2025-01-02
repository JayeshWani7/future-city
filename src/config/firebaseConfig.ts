import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Replace the values below with your Firebase project settings
const firebaseConfig = {
  apiKey: "AIzaSyAfZt1nST5N3IU9OYYb7yImey-HEDcsOSg",
  authDomain: "future-city-b6cb1.firebaseapp.com",
  projectId: "future-city-b6cb1",
  storageBucket: "future-city-b6cb1.firebasestorage.app",
  messagingSenderId: "598712444465",
  appId: "1:598712444465:web:0253a57fb040a4958f9710",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Firebase services
const auth = getAuth(app); // Authentication
const db = getFirestore(app); // Firestore Database

export { auth, db };
