import './Header.css'
import gear from '../../Assets/gear.png'
import { signInWithGoogle, signOut } from '../../firebaseConfig'
import { Link } from 'react-router-dom'


export function Header() {
    return (
        <div className='headercontainer'>
            <h1>Helping Hand</h1>
            <ul className='options'>
                <button onClick={signInWithGoogle}>Login</button>
                <Link to="/about"><button>About</button></Link>
                <Link to="/settings"><img src={gear} alt="Gear" /></Link>
            </ul>

        </div>
    )
}