import './Header.css'
import logo from '../../Assets/logo.png'
import { signInWithGoogle } from '../../firebaseConfig'
import { Link, NavLink } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../../Context/AuthContext'

const navLinks = [
    { to: '/', label: 'Today' },
    { to: '/add-entry', label: 'Add Entry' },
    { to: '/history', label: 'History' },
    { to: '/daily-targets', label: 'Targets' },
    { to: '/about', label: 'About' },
];

export function Header() {
    const { user } = useContext(AuthContext);

    return (
        <header className='site-header'>
            <div className='headercontainer'>
                <Link to="/" className='brand'>
                    <span className='brand-logo'><img src={logo} alt="" /></span>
                    <h1>Helping Hand</h1>
                </Link>

                <nav className='options' aria-label="Main">
                    {navLinks.map(link => (
                        <NavLink key={link.to} to={link.to} end className='nav-link'>
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <div className='header-actions'>
                    {user ? (
                        <Link to="/settings" className='user-chip' title={user.displayName ?? 'Account'}>
                            {user.photoURL
                                ? <img src={user.photoURL} alt="" referrerPolicy="no-referrer" />
                                : <span>{(user.displayName ?? '?')[0]}</span>}
                        </Link>
                    ) : (
                        <button onClick={signInWithGoogle}>Sign in</button>
                    )}
                    <NavLink to="/settings" className='icon-button' aria-label="Settings">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                    </NavLink>
                </div>
            </div>
        </header>
    )
}
