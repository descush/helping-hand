import { useContext } from 'react';
import FoodContext from '../../Context/FoodContext';
import { signInWithGoogle } from '../../firebaseConfig';
import { categories } from '../../categories';
import { ProgressRing } from '../ProgressRing/ProgressRing';
import './Landing.css';

const previewValues = [4, 3, 2, 3];

const handDescriptions: Record<string, string> = {
    protein: 'Meat, fish, eggs, tofu. The size and thickness of your palm.',
    veggies: 'Leafy greens, broccoli, peppers. About the size of your fist.',
    carbs: 'Rice, oats, fruit, potatoes. What fits in a cupped hand.',
    fat: 'Oils, nuts, cheese, avocado. The length of your thumb.',
};

const features = [
    { icon: '⚡', title: 'Log in seconds', text: 'Tap +1 for a quick portion, or search 300,000+ foods from the USDA database.' },
    { icon: '🎯', title: 'Your day at a glance', text: 'Progress rings show exactly how much protein, veggies, carbs and fat you have left.' },
    { icon: '🔥', title: 'Build the habit', text: 'Streaks and a weekly view keep you consistent, which matters more than perfection.' },
];

// Shown on "/" to visitors who haven't signed in, started as a guest, or opened the demo
export function Landing() {
    const { startDemo, startAsGuest } = useContext(FoodContext);

    return (
        <main className='landing'>
            <section className='landing-hero page'>
                <div className='landing-copy'>
                    <span className='eyebrow'>Nutrition tracking, simplified</span>
                    <h2>Your hand is the only measuring tool you need.</h2>
                    <p className='landing-lede'>
                        No scales. No calorie math. Helping Hand tracks your meals in palms, fists,
                        cupped hands and thumbs, a method used by nutrition coaches that's nearly as
                        accurate as weighing your food.
                    </p>
                    <div className='landing-ctas'>
                        <button className='btn-lg' onClick={startDemo}>Try the demo</button>
                        <button className='btn-lg btn-secondary' onClick={signInWithGoogle}>Sign in with Google</button>
                    </div>
                    <button className='btn-link landing-guest' onClick={startAsGuest}>
                        or start without an account →
                    </button>
                </div>

                <div className='landing-preview card' aria-hidden='true'>
                    <div className='preview-header'>
                        <span className='eyebrow'>Today</span>
                        <span className='preview-streak'>🔥 9-day streak</span>
                    </div>
                    <div className='preview-grid'>
                        {categories.map((category, i) => (
                            <div className='preview-item' key={category.key}>
                                <ProgressRing value={previewValues[i]} max={category.dailyTarget} size={84}>
                                    <img src={category.icon} alt='' />
                                </ProgressRing>
                                <strong>{category.label}</strong>
                                <span>{previewValues[i]} / {category.dailyTarget}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className='landing-section page'>
                <h2 className='section-title'>Four portions. One hand.</h2>
                <div className='hands-grid'>
                    {categories.map(category => (
                        <article className='card hand-card' key={category.key}>
                            <div className='hand-icon large'><img src={category.icon} alt={category.servingType} /></div>
                            <h3>{category.servingType} <span>= {category.label}</span></h3>
                            <p>{handDescriptions[category.key]}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className='landing-section page'>
                <div className='features-grid'>
                    {features.map(feature => (
                        <div className='feature' key={feature.title}>
                            <span className='feature-icon' aria-hidden='true'>{feature.icon}</span>
                            <h3>{feature.title}</h3>
                            <p>{feature.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className='page'>
                <div className='card landing-final'>
                    <h2>Ready to give it a hand?</h2>
                    <p>See a full day of sample data, or jump straight in.</p>
                    <div className='landing-ctas'>
                        <button className='btn-lg' onClick={startDemo}>Try the demo</button>
                        <button className='btn-lg btn-secondary' onClick={startAsGuest}>Start tracking</button>
                    </div>
                </div>
            </section>
        </main>
    );
}
