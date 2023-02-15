// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6E7uOBfVaK7UvzaRIPuDqoEzafEQMlFM",
  authDomain: "nextjstodo-93a52.firebaseapp.com",
  projectId: "nextjstodo-93a52",
  storageBucket: "nextjstodo-93a52.appspot.com",
  messagingSenderId: "925781609403",
  appId: "1:925781609403:web:284ce272e444de679c529e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider()
const storage = getStorage(app);
export {db, auth, provider, storage}