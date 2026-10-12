import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import FoodContext from "../../Context/FoodContext";
import AuthContext from "../../Context/AuthContext";
import { useToast } from "../../Context/ToastContext";
import { categories, categoryForServingType, Category, CategoryKey, formatServing } from "../../categories";
import { currentStreak, dayKey, mealFor, meals } from "../../stats";
import { FoodEntry } from "../../Interface/FoodEntry";
import { ProgressRing } from "../ProgressRing/ProgressRing";
import { Landing } from "../Landing/Landing";
import { Onboarding, hasOnboarded } from "../Onboarding/Onboarding";
import logo from "../../Assets/logo.png";
import "./Home.css";

function greeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
}

// Step through whole portions, with a half portion as the smallest amount
function stepAmount(amount: number, direction: 1 | -1) {
    if (direction === 1) return amount < 1 ? 1 : amount + 1;
    return amount > 1 ? amount - 1 : 0.5;
}

export function Home() {
    const {
        foodEntry,
        entriesReady,
        mode,
        hasStarted,
        addFood,
        updateFood,
        removeFood,
        dailyProteinSubmissions,
        dailyVeggieSubmissions,
        dailyCarbSubmissions,
        dailyFatSubmissions
    } = useContext(FoodContext);
    const { user, authReady } = useContext(AuthContext);
    const { showToast } = useToast();
    const location = useLocation();

    const [showIntro, setShowIntro] = useState(false);
    const [celebrating, setCelebrating] = useState<CategoryKey | null>(null);

    const today = dayKey(new Date());
    const todayTotals: Record<CategoryKey, number> = {
        protein: dailyProteinSubmissions[today] || 0,
        veggies: dailyVeggieSubmissions[today] || 0,
        carbs: dailyCarbSubmissions[today] || 0,
        fat: dailyFatSubmissions[today] || 0,
    };

    const todaysEntries = foodEntry
        .filter(entry => entry.timestamp && dayKey(entry.timestamp) === today)
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    const streak = useMemo(() => currentStreak(foodEntry), [foodEntry]);

    // First visit (or "Replay intro" from settings) opens the walkthrough; not during the demo
    useEffect(() => {
        if (!hasStarted || mode === "demo") return;
        if (!hasOnboarded() || new URLSearchParams(location.search).has("intro")) setShowIntro(true);
    }, [hasStarted, mode, location.search]);

    // Celebrate when a category crosses its target (not when entries first load)
    // Switching between guest, account and demo data resets the baseline
    const previousTotals = useRef<{ source: string; totals: Record<CategoryKey, number> } | null>(null);
    const source = `${mode}:${user?.uid ?? ""}`;
    useEffect(() => {
        if (!entriesReady) {
            previousTotals.current = null;
            return;
        }
        const previous = previousTotals.current?.source === source ? previousTotals.current.totals : null;
        previousTotals.current = { source, totals: todayTotals };
        if (!previous) return;
        const reached = categories.find(c => previous[c.key] < c.dailyTarget && todayTotals[c.key] >= c.dailyTarget);
        if (reached) {
            setCelebrating(reached.key);
            // After the "Added…" toast from the same click, so the celebration is what shows
            setTimeout(() => showToast({ message: `🎉 ${reached.label} target reached!`, tone: "success" }), 100);
            setTimeout(() => setCelebrating(null), 1600);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [entriesReady, source, todayTotals.protein, todayTotals.veggies, todayTotals.carbs, todayTotals.fat]);

    if (!hasStarted) return <Landing />;
    if (!authReady) return <main className="page" aria-busy="true" />;

    async function quickAdd(category: Category) {
        const saved = await addFood({
            fdcId: 0,
            description: `Quick add: ${category.label.toLowerCase()}`,
            servingType: category.servingType,
            servingAmount: 1,
            timestamp: new Date(),
        });
        if (saved?.id) {
            showToast({
                message: `Added ${formatServing(1, category)} of ${category.label.toLowerCase()}`,
                action: { label: "Undo", onClick: () => removeFood(saved.id!) },
            });
        }
    }

    function remove(entry: FoodEntry) {
        if (!entry.id) return;
        removeFood(entry.id);
        showToast({
            message: `Removed ${entry.description.toLowerCase()}`,
            action: { label: "Undo", onClick: () => addFood(entry) },
        });
    }

    const firstName = user?.displayName?.split(" ")[0];
    const dateLabel = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });

    return (
        <main className="page">
            {showIntro && <Onboarding onClose={() => setShowIntro(false)} />}

            <section className="hero">
                <div>
                    <span className="eyebrow">{dateLabel}</span>
                    <h2>{greeting()}{firstName ? `, ${firstName}` : ""}.</h2>
                    <p>Here's how your hand portions are stacking up today.</p>
                </div>
                <div className="hero-actions">
                    {streak > 0 && (
                        <Link to="/history" className="streak-pill" title="Days in a row with at least one entry">
                            🔥 {streak}-day streak
                        </Link>
                    )}
                    <Link to="/add-entry" className="btn btn-lg">Search foods</Link>
                </div>
            </section>

            <section className="progress-grid" aria-label="Today's progress">
                {categories.map(category => {
                    const value = todayTotals[category.key];
                    const remaining = Math.max(category.dailyTarget - value, 0);
                    return (
                        <article
                            className={`card progress-card ${celebrating === category.key ? "celebrate" : ""}`}
                            key={category.key}
                            aria-busy={!entriesReady}
                        >
                            <div className="progress-visual">
                                <ProgressRing value={entriesReady ? value : 0} max={category.dailyTarget}>
                                    <div className="hand-icon"><img src={category.icon} alt="" /></div>
                                </ProgressRing>
                                {celebrating === category.key && (
                                    <div className="burst" aria-hidden="true">
                                        {Array.from({ length: 10 }, (_, i) => <span key={i} style={{ "--i": i } as React.CSSProperties} />)}
                                    </div>
                                )}
                            </div>
                            <h3>{category.label}</h3>
                            <p className="progress-count">
                                <strong>{value}</strong> / {category.dailyTarget} {category.unit}
                            </p>
                            <p className="progress-hint">
                                {remaining === 0 ? "Target reached 🎉" : `${remaining} to go`}
                            </p>
                            <button
                                type="button"
                                className="quick-add btn-secondary"
                                onClick={() => quickAdd(category)}
                                aria-label={`Quick add one ${category.servingType.toLowerCase()} of ${category.label.toLowerCase()}`}
                            >
                                + 1 {category.unit.replace(/s$/, "")}
                            </button>
                        </article>
                    );
                })}
            </section>

            <section className="card log-card">
                <div className="log-header">
                    <h3>Today's log</h3>
                    {todaysEntries.length > 0 && (
                        <span className="pill">{todaysEntries.length} {todaysEntries.length === 1 ? "entry" : "entries"}</span>
                    )}
                </div>

                {!entriesReady ? (
                    <div className="log-skeleton" aria-hidden="true"><span /><span /><span /></div>
                ) : todaysEntries.length === 0 ? (
                    <div className="empty-state">
                        <img src={logo} alt="" />
                        <p>Nothing logged yet today. Tap <strong>+1</strong> on a card above or search for a food.</p>
                        <Link to="/add-entry" className="btn btn-secondary">Search foods</Link>
                    </div>
                ) : (
                    meals.map(meal => {
                        const mealEntries = todaysEntries.filter(entry => mealFor(entry.timestamp) === meal);
                        if (mealEntries.length === 0) return null;
                        return (
                            <div className="meal-group" key={meal}>
                                <h4 className="meal-title">{meal}</h4>
                                <ul className="log-list">
                                    {mealEntries.map((entry, index) => {
                                        const category = categoryForServingType(entry.servingType);
                                        const amount = entry.servingAmount ?? 1;
                                        return (
                                            <li key={entry.id ?? `${entry.fdcId}-${index}`}>
                                                {category && <div className="hand-icon small"><img src={category.icon} alt="" /></div>}
                                                <div className="log-item-text">
                                                    <span className="log-item-name">{entry.description.toLowerCase()}</span>
                                                    <span className="log-item-meta">
                                                        {category ? `${category.label} · ` : ""}
                                                        {new Date(entry.timestamp).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                                                    </span>
                                                </div>
                                                <div className="stepper" role="group" aria-label={`Amount of ${entry.description.toLowerCase()}`}>
                                                    <button
                                                        type="button"
                                                        aria-label="Decrease"
                                                        disabled={!entry.id || amount <= 0.5}
                                                        onClick={() => updateFood(entry.id!, { servingAmount: stepAmount(amount, -1) })}
                                                    >−</button>
                                                    <span>{category ? formatServing(amount, category) : amount}</span>
                                                    <button
                                                        type="button"
                                                        aria-label="Increase"
                                                        disabled={!entry.id}
                                                        onClick={() => updateFood(entry.id!, { servingAmount: stepAmount(amount, 1) })}
                                                    >+</button>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="icon-btn delete"
                                                    aria-label={`Remove ${entry.description.toLowerCase()}`}
                                                    disabled={!entry.id}
                                                    onClick={() => remove(entry)}
                                                >
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                                        <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                                                    </svg>
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        );
                    })
                )}
            </section>
        </main>
    );
}
