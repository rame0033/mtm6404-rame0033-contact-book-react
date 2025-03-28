// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCI1fsDe1iDE3paw_egz8fykrWXnfDYkEA",
  authDomain: "mtm6404-contacts-14c99.firebaseapp.com",
  projectId: "mtm6404-contacts-14c99",
  storageBucket: "mtm6404-contacts-14c99.firebasestorage.app",
  messagingSenderId: "788972432506",
  appId: "1:788972432506:web:4b144ab40004955220dfc3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;