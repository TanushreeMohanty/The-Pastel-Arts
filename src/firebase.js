import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjzVnXUxBxd6HYH0GC7bNgR5tDr-joMGI",
  authDomain: "the-pastel-arts.firebaseapp.com",
  projectId: "the-pastel-arts",
  storageBucket: "the-pastel-arts.firebasestorage.app",
  messagingSenderId: "438091437075",
  appId: "1:438091437075:web:9efe3532b2c5fe7c7e1be6",
  measurementId: "G-Z97CY3P0V7"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
