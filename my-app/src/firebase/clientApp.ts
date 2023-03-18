// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNd-Vs3rJiRaBtH4zLOJLm1QcAa8_jIuY",
  authDomain: "ecommerce-da4a2.firebaseapp.com",
  projectId: "ecommerce-da4a2",
  storageBucket: "ecommerce-da4a2.appspot.com",
  messagingSenderId: "552128772401",
  appId: "1:552128772401:web:969698debb0bcdfd2b1810"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {app};