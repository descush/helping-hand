import { Link } from "react-router-dom";
import { signOut } from "../../firebaseConfig";
import { useContext } from "react";
import { DarkThemeContext } from "../../Context/DarkThemeContext";

export function Settings() {
    const { darkTheme, toggleDarkTheme } = useContext(DarkThemeContext)
    return (
        <div>
            <button onClick={toggleDarkTheme}>
                click for {darkTheme ? "light theme" : "dark theme"}
            </button>
            <button onClick={signOut}>Sign Out</button>
            <Link to={'/'}>Home</Link>
        </div>
    )
}