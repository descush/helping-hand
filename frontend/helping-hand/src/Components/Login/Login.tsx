import { signInWithGoogle } from "../../firebaseConfig";
import logo from "../../Assets/logo.png";

export function Login() {
    return (
        <main className="page page-narrow">
            <div className="card empty-state">
                <img src={logo} alt="" />
                <h2>Welcome to Helping Hand</h2>
                <p>Track your nutrition with the portion tool you always have on you.</p>
                <button className="btn-lg" onClick={signInWithGoogle}>Sign in with Google</button>
            </div>
        </main>
    )
}
