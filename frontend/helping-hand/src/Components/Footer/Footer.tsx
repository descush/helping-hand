import { Link } from 'react-router-dom';
import './Footer.css';

export function Footer() {
    return (
        <footer className='site-footer'>
            <p>
                Built by Jeremy Schlossman, Justin Green, Desiree Cushing &amp; Shelby Wright ·{' '}
                <Link to='/about'>About</Link>
            </p>
            <p className='footer-note'>Food data from USDA FoodData Central. Not medical advice.</p>
        </footer>
    );
}
