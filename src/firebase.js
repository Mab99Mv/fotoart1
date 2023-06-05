import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "fotoart-5ec41",
  "appId": "1:515363062357:web:82641dccaeb3ec7353cadc",
  "storageBucket": "fotoart-5ec41.appspot.com",
  "locationId": "us-central",
  "apiKey": "AIzaSyAZOjN3VSoyN6Mn7YkeNTYwypZc8S9yKIY",
  "authDomain": "fotoart-5ec41.firebaseapp.com",
  "messagingSenderId": "515363062357"
};
// Inicializa Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Obtiene una referencia al servicio de Firestore
const db = firebase.firestore();

// Obtiene una referencia al servicio de Storage
const storage = firebase.storage();

// Obtiene una referencia al servicio de autenticación
const auth = firebase.auth();

export { db, storage, auth };