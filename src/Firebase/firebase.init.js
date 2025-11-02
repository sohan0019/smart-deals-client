// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpsaG4P3-ksmiiGZu3AuHFvv1pK7e9_o8",
  authDomain: "smart-deals-3f08b.firebaseapp.com",
  projectId: "smart-deals-3f08b",
  storageBucket: "smart-deals-3f08b.firebasestorage.app",
  messagingSenderId: "790017930347",
  appId: "1:790017930347:web:430bc12992d48b41f6ed2e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);