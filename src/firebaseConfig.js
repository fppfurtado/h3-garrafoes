// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2rF_tx9_ON5_-rHqhWgNQRMmbtakrwhg",
  authDomain: "h3-garrafoes-9b705.firebaseapp.com",
  projectId: "h3-garrafoes-9b705",
  storageBucket: "h3-garrafoes-9b705.appspot.com",
  messagingSenderId: "903388842207",
  appId: "1:903388842207:web:50df84f6baccdf1a6f016a",
  measurementId: "G-GS9JTL36LB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);