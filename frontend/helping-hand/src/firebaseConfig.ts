import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBuRufeKQzyzXn5oCx-ZVyhzAzPn63pFag",
    authDomain: "helping-hand-journal.firebaseapp.com",
    projectId: "helping-hand-journal",
    storageBucket: "helping-hand-journal.appspot.com",
    messagingSenderId: "433410431563",
    appId: "1:433410431563:web:030db63b78d0a908e9cbce"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
    signInWithPopup(auth, authProvider);
}

export function signOut(): void {
    auth.signOut();
}

export const storage = getStorage(app);