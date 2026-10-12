import { signInWithGoogle, signOut } from "../../firebaseConfig";
import { useContext } from "react";
import { DarkThemeContext } from "../../Context/DarkThemeContext";
import AuthContext from "../../Context/AuthContext";
import FoodContext from "../../Context/FoodContext";
import { useNavigate } from "react-router-dom";
import '../../index.css';
import './Settings.css';

export function Settings() {
    const { darkTheme, toggleDarkTheme } = useContext(DarkThemeContext)
    const { user } = useContext(AuthContext);
    const { mode, exitDemo } = useContext(FoodContext);
    const navigate = useNavigate();

    const storageDescription = {
        demo: "You're viewing sample data. Nothing you change is saved.",
        guest: "Entries are saved in this browser only. Sign in to sync them across devices.",
        user: "Entries are saved to your Google account and sync across devices.",
    }[mode];

    return (
        <main className="page page-narrow">
            <header className="page-header">
                <h2>Settings</h2>
            </header>

            <section className="card settings-section">
                <h3>Appearance</h3>
                <div className="setting-row">
                    <div>
                        <p className="setting-title">Dark theme</p>
                        <p className="setting-desc">Easier on the eyes at night.</p>
                    </div>
                    <button
                        type="button"
                        role="switch"
                        aria-checked={darkTheme}
                        aria-label="Dark theme"
                        className={`switch ${darkTheme ? "on" : ""}`}
                        onClick={toggleDarkTheme}
                    >
                        <span className="switch-thumb" />
                    </button>
                </div>
            </section>

            <section className="card settings-section">
                <h3>Account</h3>
                {user ? (
                    <div className="setting-row">
                        <div className="account">
                            {user.photoURL && <img src={user.photoURL} alt="" referrerPolicy="no-referrer" />}
                            <div>
                                <p className="setting-title">{user.displayName}</p>
                                <p className="setting-desc">{user.email}</p>
                            </div>
                        </div>
                        <button className="btn-secondary" onClick={signOut}>Sign out</button>
                    </div>
                ) : (
                    <div className="setting-row">
                        <div>
                            <p className="setting-title">Not signed in</p>
                            <p className="setting-desc">Sign in with Google to sync your entries across devices.</p>
                        </div>
                        <button onClick={signInWithGoogle}>Sign in</button>
                    </div>
                )}
            </section>

            <section className="card settings-section">
                <h3>Your data</h3>
                <div className="setting-row">
                    <div>
                        <p className="setting-title">
                            {mode === "user" ? "☁️ Synced" : mode === "demo" ? "👀 Demo mode" : "💻 This browser"}
                        </p>
                        <p className="setting-desc">{storageDescription}</p>
                    </div>
                    {mode === "demo" && <button className="btn-secondary" onClick={exitDemo}>Exit demo</button>}
                </div>
                <div className="setting-row">
                    <div>
                        <p className="setting-title">Intro walkthrough</p>
                        <p className="setting-desc">See the hand-portion guide again.</p>
                    </div>
                    <button className="btn-secondary" onClick={() => navigate("/?intro")}>Replay intro</button>
                </div>
            </section>
        </main>
    )
}
