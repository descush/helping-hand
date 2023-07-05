import { Link } from "react-router-dom";
import { signOut } from "../../firebaseConfig";
import { useContext } from "react";
import { DarkThemeContext } from "../../Context/DarkThemeContext";
import './Settings.css';

export function Settings() {
    const { darkTheme, toggleDarkTheme } = useContext(DarkThemeContext)
    return (
        <div className='settingsDiv'>
            <button className='settingBtn topBtn' onClick={toggleDarkTheme}>
                click for {darkTheme ? "light theme" : "dark theme"}
            </button>
            <button className='settingBtn' onClick={signOut}>Sign Out</button>
            <Link className='settingBtn' to={'/'}><button>Home</button></Link>
        </div>
    )
}