import './Header.css'
import optionswheelimg from './optionswheel.png'

export function Header() {
    return (
        <div className='headercontainer'>
            <h1>Helping Hand</h1>
            <ul className='options'>
                <li>User Info</li>
                <li>Login</li>
                <img src={optionswheelimg} alt="Options Wheel" />
            </ul>

        </div>
    )
}