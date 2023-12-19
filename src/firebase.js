import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { addDoc, collection, query, where, getDocs, onSnapshot} from "firebase/firestore"
//import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyA-Sh90sOqWBxG-nWEthCrV4YxTIeDDelc",
    authDomain: "netflix-clone-ddaf8.firebaseapp.com",
    projectId: "netflix-clone-ddaf8",
    storageBucket: "netflix-clone-ddaf8.appspot.com",
    messagingSenderId: "248274640766",
    appId: "1:248274640766:web:e10c44b168c9f400e69d2f",
    measurementId: "G-HMWJS2EJ6N"
  };

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export {auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getDocs, collection, query, where, addDoc, onSnapshot}
export default db;