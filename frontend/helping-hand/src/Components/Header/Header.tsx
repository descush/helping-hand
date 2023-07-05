import './Header.css'
import logo from '../../Assets/logo.png'
import { signInWithGoogle } from '../../firebaseConfig'
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { DarkThemeContext } from '../../Context/DarkThemeContext';



export function Header() {
    const { darkTheme } = useContext(DarkThemeContext);

    return (
        <div className={`Header ${darkTheme ? 'dark' : 'light'}`}>
            <img className="logo" src={logo} alt="logo"></img>
            <div className='options'>
                <ul className='headerUl'>
                    <li className='headerLi'>
                        <button className='navLink removeButtonStyles' onClick={signInWithGoogle}>Login</button>
                    </li>
                    <li className='headerLi'>
                        <Link to="/about" className='navLink'><button className='navLink removeButtonStyles'>About</button></Link>
                    </li>
                    <li className='headerLi'>
                        <Link to="/settings" className='navLink'><button className='navLink removeButtonStyles'>Settings</button></Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}