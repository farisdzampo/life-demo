// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhzVnb9Kble__dlWmRdTZkSdj3JNljzI4",
  authDomain: "life-reactnative.firebaseapp.com",
  databaseURL: "https://life-reactnative-default-rtdb.firebaseio.com",
  projectId: "life-reactnative",
  storageBucket: "life-reactnative.appspot.com",
  messagingSenderId: "282315155395",
  appId: "1:282315155395:web:8ae5528eb7e8dcb15b7f76",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
