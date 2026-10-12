import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBuRufeKQzyzXn5oCx-ZVyhzAzPn63pFag",
    authDomain: "helping-hand-journal.firebaseapp.com",
    projectId: "helping-hand-journal",
    storageBucket: "helping-hand-journal.appspot.com",
    messagingSenderId: "433410431563",
    appId: "1:433410431563:web:030db63b78d0a908e9cbce"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
    // Closing the popup rejects; that is not an error worth surfacing
    signInWithPopup(auth, authProvider).catch(error => console.warn("Sign-in cancelled:", error.code));
}

export function signOut(): void {
    auth.signOut();
}

