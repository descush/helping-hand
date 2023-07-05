import './Header.css'
import gear from '../../Assets/gear.png'
import { signInWithGoogle, signOut } from '../../firebaseConfig'
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useContext } from "react";
import { DarkThemeContext } from '../../Context/DarkThemeContext';



export function Header() {
    const { darkTheme } = useContext(DarkThemeContext);

    return (
        <div className={`Header ${darkTheme ? 'dark' : 'light'}`}>
            <h1>Helping Hand</h1>
            <ul className='options'>
                <button className='navLink signInButton' onClick={signInWithGoogle}>Login</button>
                <Link className='navLink' to="/about">About</Link>
                <Link to="/settings" className='navLink'>Settings<img className='gear' src={gear} alt="Gear" /></Link>
            </ul>

        </div>
    )
}