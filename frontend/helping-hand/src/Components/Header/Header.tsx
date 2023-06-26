import './Header.css'
import gear from '../../Assets/gear.png'

export function Header() {
    return (
        <div className='headercontainer'>
            <h1>Helping Hand</h1>
            <ul className='options'>
                <li>User Info</li>
                <li>Login</li>
                <img src={gear} alt="Gear" />
            </ul>

        </div>
    )
}