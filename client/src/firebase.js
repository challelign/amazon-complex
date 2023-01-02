import * as firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDqYfbKpe2vbKhk7mhOcnKOm_Z1kUiqK6M",
    authDomain: "complex-96972.firebaseapp.com",
    projectId: "complex-96972",
    storageBucket: "complex-96972.appspot.com",
    messagingSenderId: "356144245905",
    appId: "1:356144245905:web:1aa08b69b31312858de330",
    measurementId: "G-S6952S65ML"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
