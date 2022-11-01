// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDQHdRtWPITr3vEyV83xTygZBpfNuR0Byo",
  authDomain: "apnastore-f4a4e.firebaseapp.com",
  projectId: "apnastore-f4a4e",
  storageBucket: "apnastore-f4a4e.appspot.com",
  messagingSenderId: "708966241228",
  appId: "1:708966241228:web:7000c96abbfe5c7c804369",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth  = getAuth(app)
export const db  = getFirestore(app)
export const storage  = getStorage(app)

export default app
