import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZOjN3VSoyN6Mn7YkeNTYwypZc8S9yKIY",
  authDomain: "fotoart-5ec41.firebaseapp.com",
  projectId: "fotoart-5ec41",
  storageBucket: "fotoart-5ec41.appspot.com",
  messagingSenderId: "515363062357",
  appId: "1:515363062357:web:44e834053695c96f53cadc"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore();
const storage   = firebase.storage();

export {
   storage, firestore as default
}