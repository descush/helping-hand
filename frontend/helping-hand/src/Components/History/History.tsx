import { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import FoodContext from '../../Context/FoodContext';
import { categories } from '../../categories';
import { currentStreak, dayKey, targetsHit, totalsByDay, weekOf } from '../../stats';
import { ProgressRing } from '../ProgressRing/ProgressRing';
import './History.css';

export function History() {
    const { foodEntry } = useContext(FoodContext);
    const [weekOffset, setWeekOffset] = useState(0);

    const days = useMemo(() => totalsByDay(foodEntry), [foodEntry]);
    const streak = useMemo(() => currentStreak(foodEntry), [foodEntry]);

    const anchor = new Date();
    anchor.setDate(anchor.getDate() + weekOffset * 7);
    const week = weekOf(anchor);
    const todayKey = dayKey(new Date());
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const pastDays = week.filter(d => d <= todayStart);
    const daysLogged = pastDays.filter(d => days[dayKey(d)]).length;
    const targetsMet = pastDays.reduce((sum, d) => sum + targetsHit(days[dayKey(d)]), 0);
    const possibleTargets = pastDays.length * categories.length;

    const rangeLabel = `${week[0].toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} – ${week[6].toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`;

    return (
        <main className='page'>
            <header className='page-header'>
                <span className='eyebrow'>Your progress</span>
                <h2>History</h2>
                <p>Consistency beats perfection. Here's how your week is going.</p>
            </header>

            <section className='stat-row'>
                <div className='card stat-card'>
                    <span className='stat-icon' aria-hidden='true'>🔥</span>
                    <div>
                        <strong>{streak} {streak === 1 ? 'day' : 'days'}</strong>
                        <span>Current streak</span>
                    </div>
                </div>
                <div className='card stat-card'>
                    <span className='stat-icon' aria-hidden='true'>📅</span>
                    <div>
                        <strong>{daysLogged} / {pastDays.length || 7}</strong>
                        <span>Days logged this week</span>
                    </div>
                </div>
                <div className='card stat-card'>
                    <span className='stat-icon' aria-hidden='true'>🎯</span>
                    <div>
                        <strong>{targetsMet} / {possibleTargets || 28}</strong>
                        <span>Targets hit this week</span>
                    </div>
                </div>
            </section>

            <section className='card week-card'>
                <div className='week-header'>
                    <button type='button' className='icon-btn' aria-label='Previous week' onClick={() => setWeekOffset(weekOffset - 1)}>‹</button>
                    <h3>{weekOffset === 0 ? 'This week' : rangeLabel}</h3>
                    <button type='button' className='icon-btn' aria-label='Next week' disabled={weekOffset >= 0} onClick={() => setWeekOffset(weekOffset + 1)}>›</button>
                </div>

                <div className='week-scroll'>
                    <table className='week-grid'>
                        <thead>
                            <tr>
                                <th scope='col'><span className='visually-hidden'>Category</span></th>
                                {week.map(d => (
                                    <th scope='col' key={d.toISOString()} className={dayKey(d) === todayKey ? 'is-today' : ''}>
                                        <span>{d.toLocaleDateString(undefined, { weekday: 'short' })}</span>
                                        <span className='week-date'>{d.getDate()}</span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(category => (
                                <tr key={category.key}>
                                    <th scope='row'>
                                        <div className='hand-icon small'><img src={category.icon} alt='' /></div>
                                        <span>{category.label}</span>
                                    </th>
                                    {week.map(d => {
                                        const value = days[dayKey(d)]?.[category.key] ?? 0;
                                        const future = d > todayStart;
                                        return (
                                            <td key={d.toISOString()} className={future ? 'future' : ''}>
                                                {future ? <span className='week-dash'>·</span> : (
                                                    <ProgressRing value={value} max={category.dailyTarget} size={40} strokeWidth={9}>
                                                        <span className='week-value'>{value}</span>
                                                    </ProgressRing>
                                                )}
                                                <span className='visually-hidden'>{value} of {category.dailyTarget} {category.unit}</span>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className='week-legend'>
                    <span className='legend-dot green' /> In progress
                    <span className='legend-dot orange' /> Target reached
                </p>
            </section>

            {foodEntry.length === 0 && (
                <div className='empty-state'>
                    <p>No history yet. Your first entry starts your streak.</p>
                    <Link to='/' className='btn'>Log something today</Link>
                </div>
            )}
        </main>
    );
}
