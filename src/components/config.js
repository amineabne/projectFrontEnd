import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAL4TTHffnXh-YcR7LYRnhcNjfXvVh5mu8",
    authDomain: "vente-billets-app.firebaseapp.com",
    projectId: "vente-billets-app",
    storageBucket: "vente-billets-app.appspot.com",
    messagingSenderId: "929976793935",
    appId: "1:929976793935:web:80e6652af9b7a9b600a33a",
    measurementId: "G-TX3HL71YS9"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider};