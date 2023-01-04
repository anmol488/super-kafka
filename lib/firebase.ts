import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDV1p8CRbgHekyvo1uC_8DeO6iQphldXrE",
  authDomain: "superkafka.firebaseapp.com",
  projectId: "superkafka",
  storageBucket: "superkafka.appspot.com",
  messagingSenderId: "576874222078",
  appId: "1:576874222078:web:a837ec2c83467409fff0af",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

export { app, db };
