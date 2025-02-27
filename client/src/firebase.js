// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-deb97.firebaseapp.com",
  projectId: "mern-estate-deb97",
  storageBucket: "mern-estate-deb97.appspot.com",
  messagingSenderId: "1000639914771",
  appId: "1:1000639914771:web:9ee30a6251c1f65bd630e6",
  measurementId: "G-JBY20XEE5Z"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);