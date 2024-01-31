import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwJZLOvxKQlWQTpH9iBklsJ4qYfouMBLU",
  authDomain: "openinapp-assignment-1f50c.firebaseapp.com",
  projectId: "openinapp-assignment-1f50c",
  storageBucket: "openinapp-assignment-1f50c.appspot.com",
  messagingSenderId: "725045700587",
  appId: "1:725045700587:web:e587d733423d294f599bae",
  measurementId: "G-KZGMZX5XRZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };