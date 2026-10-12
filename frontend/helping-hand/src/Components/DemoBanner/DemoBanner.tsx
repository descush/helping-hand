import { useContext } from 'react';
import FoodContext from '../../Context/FoodContext';
import { signInWithGoogle } from '../../firebaseConfig';
import './DemoBanner.css';

// Shown across the top while the visitor is exploring sample data
export function DemoBanner() {
    const { mode, exitDemo } = useContext(FoodContext);
    if (mode !== 'demo') return null;

    return (
        <div className='demo-banner'>
            <span>👋 You're exploring with sample data. Changes aren't saved.</span>
            <div className='demo-banner-actions'>
                <button type='button' onClick={signInWithGoogle}>Sign in to start</button>
                <button type='button' className='btn-link' onClick={exitDemo}>Exit demo</button>
            </div>
        </div>
    );
}
