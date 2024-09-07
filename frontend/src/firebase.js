// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKKcLJ42ZKpvIZiEkhCehVRn18cHy4ADA",
  authDomain: "timelycuts.firebaseapp.com",
  projectId: "timelycuts",
  storageBucket: "timelycuts.appspot.com",
  messagingSenderId: "693929175683",
  appId: "1:693929175683:web:763ba8a87eca9c5d8d89b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth };
export { db };