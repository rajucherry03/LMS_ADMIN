import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyC5jDs4RajBj_56yghhaLKEDAZ32aU2sj4",
  authDomain: "lms1-afbef.firebaseapp.com",
  projectId: "lms1-afbef",
  storageBucket: "lms1-afbef.appspot.com", 
  messagingSenderId: "133572239146",
  appId: "1:133572239146:web:c3fb8887c9889143428853",
  measurementId: "G-HD2SYYQN1H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, googleProvider };
