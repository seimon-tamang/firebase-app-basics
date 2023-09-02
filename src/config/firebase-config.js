import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyDxiVVLnjoJr9ml-M8n3utdoaJ1_Z021KY",
  authDomain: "fir-practice-1021e.firebaseapp.com",
  projectId: "fir-practice-1021e",
  storageBucket: "fir-practice-1021e.appspot.com",
  messagingSenderId: "943291909223",
  appId: "1:943291909223:web:48b4025208c8a1f469c0c2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);