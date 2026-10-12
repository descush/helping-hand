import { Link } from 'react-router-dom';
import { categories } from '../../categories';
import './DailyTargets.css';


export function DailyTargets() {
    return (
        <main className='page'>
            <header className='page-header'>
                <span className='eyebrow'>Your guide</span>
                <h2>Daily targets</h2>
                <p>Your hand is your portion tool. Here's what a balanced day looks like.</p>
            </header>

            <div className='targets-grid'>
                {categories.map(category => (
                    <article className='card target-card' key={category.key}>
                        <div className='hand-icon large'><img src={category.icon} alt={category.servingType} /></div>
                        <div>
                            <span className='eyebrow'>{category.servingType}</span>
                            <h3>{category.label}</h3>
                        </div>
                        <dl className='target-stats'>
                            <div>
                                <dt>Per day</dt>
                                <dd>{category.dailyLabel}</dd>
                            </div>
                            <div>
                                <dt>Per meal</dt>
                                <dd>{category.perMeal}</dd>
                            </div>
                        </dl>
                    </article>
                ))}
            </div>

            <div className='card targets-note'>
                <p>
                    These are general starting points. Portions can vary based on your goals, activity level, and hunger.
                    Some foods count as more than one type, like sweetened yogurt (carb + protein) or chips (carb + fat).
                </p>
                <Link to='/add-entry' className='btn'>Start logging</Link>
            </div>
        </main>
    )
}
