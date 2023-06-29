import { signInWithGoogle } from "../../firebaseConfig";

export function Login() {
    return (
        <div>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    )
}