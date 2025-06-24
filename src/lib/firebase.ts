import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDl6Xj7apBYQvB_hLGqdsB3a1_XQ0K8ZJE",
  authDomain: "softans-hub.firebaseapp.com",
  projectId: "softans-hub",
  storageBucket: "softans-hub.appspot.com",
  messagingSenderId: "499453852814",
  appId: "1:499453852814:web:b09d688004fd4a35b29ddf"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
