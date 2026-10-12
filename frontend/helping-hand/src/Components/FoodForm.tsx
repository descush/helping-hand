import React, { useContext, useMemo, useState } from "react";
import { Link } from 'react-router-dom';
import FoodContext from "../Context/FoodContext";
import { FoodEntry } from "../Interface/FoodEntry";
import { getFood } from "../Services/FoodService";
import { useToast } from "../Context/ToastContext";
import { categories, categoryForServingType, formatServing } from "../categories";
import "./FoodForm.css";

// Per-result choices the user makes before adding a food
interface Selection {
    servingAmount: number;
    servingType: string;
    showNutritionInfo: boolean;
}

// Headline nutrients shown on every result card
const keyNutrients = [
    { match: "Energy", label: "Calories" },
    { match: "Protein", label: "Protein" },
    { match: "Carbohydrate", label: "Carbs" },
    { match: "Total lipid", label: "Fat" },
];

function nutrientValue(food: FoodEntry, match: string) {
    return food.foodNutrients?.find(n => n.nutrientName.startsWith(match));
}

// Pick a sensible default serving type from the food's biggest macro
function guessServingType(food: FoodEntry): string {
    const protein = nutrientValue(food, "Protein")?.value ?? 0;
    const carbs = nutrientValue(food, "Carbohydrate")?.value ?? 0;
    const fat = nutrientValue(food, "Total lipid")?.value ?? 0;
    const fiber = nutrientValue(food, "Fiber")?.value ?? 0;
    if (protein >= carbs && protein >= fat) return "Palm";
    if (fat > carbs) return "Thumb";
    if (fiber > 0 && carbs < 15) return "Fist";
    return "Cupped Handfuls";
}

export function FoodForm() {
    const { addFood, removeFood, foodEntry } = useContext(FoodContext);
    const { showToast } = useToast();

    // State for form inputs
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchResults, setSearchResults] = useState<FoodEntry[]>([]);
    const [selections, setSelections] = useState<Record<number, Selection>>({});
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [error, setError] = useState("");

    // The most recent distinct foods searched and logged, for one-tap re-adding
    const recentFoods = useMemo(() => {
        const seen = new Set<string>();
        return [...foodEntry]
            .filter(entry => entry.fdcId !== 0)
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .filter(entry => {
                const key = entry.description.toLowerCase();
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
            })
            .slice(0, 8);
    }, [foodEntry]);

    // Form submission handler
    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setLoading(true);
        setError("");
        try {
            const response = await getFood(searchQuery);
            const results: FoodEntry[] = Array.isArray(response) ? response : [];
            setSearchResults(results);
            setSelections(Object.fromEntries(results.map(food => [
                food.fdcId,
                { servingAmount: 1, servingType: guessServingType(food), showNutritionInfo: false }
            ])));
        } catch (error) {
            console.error("Error fetching food data:", error);
            setError("Couldn't reach the food database. Please try again.");
            setSearchResults([]);
        } finally {
            setLoading(false);
            setHasSearched(true);
        }
    }

    function updateSelection(food: FoodEntry, changes: Partial<Selection>) {
        setSelections(prev => ({ ...prev, [food.fdcId]: { ...prev[food.fdcId], ...changes } }));
    }

    // Save a food as a new entry and offer Undo
    async function logFood(food: FoodEntry, servingAmount: number, servingType: string) {
        const { id, ...rest } = food;
        const saved = await addFood({ ...rest, timestamp: new Date(), servingAmount, servingType });
        if (!saved?.id) return;
        const category = categoryForServingType(servingType);
        const serving = category ? formatServing(servingAmount, category) : `${servingAmount} ${servingType}`;
        showToast({
            message: `Added ${serving} of ${food.description.toLowerCase()}`,
            action: { label: "Undo", onClick: () => removeFood(saved.id!) },
        });
    }

    // Function to add a selected food entry from the search results
    function addSelectedFood(food: FoodEntry) {
        const selection = selections[food.fdcId];
        logFood(food, selection.servingAmount, selection.servingType);
    }

    return (
        <main className="page">
            <header className="page-header">
                <span className="eyebrow">Log a meal</span>
                <h2>Add an entry</h2>
                <p>Search for a food, choose how many hand portions you had, and add it to today's log.</p>
            </header>

            <form className="search-bar card" onSubmit={onSubmit} role="search">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
                </svg>
                <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    type="search"
                    placeholder="Try “chicken breast” or “avocado”"
                    aria-label="Search for food"
                    autoFocus
                />
                <button type="submit" disabled={loading}>{loading ? "Searching…" : "Search"}</button>
            </form>

            {error && <p className="form-error" role="alert">{error}</p>}

            {recentFoods.length > 0 && !loading && searchResults.length === 0 && (
                <section className="recent" aria-labelledby="recent-title">
                    <h3 id="recent-title">Recent foods</h3>
                    <p className="recent-hint">Tap to log the same portion again.</p>
                    <ul className="recent-list">
                        {recentFoods.map(food => {
                            const category = categoryForServingType(food.servingType);
                            const amount = food.servingAmount ?? 1;
                            return (
                                <li key={food.id ?? food.fdcId}>
                                    <button
                                        type="button"
                                        className="recent-chip"
                                        onClick={() => logFood(food, amount, food.servingType ?? "Palm")}
                                    >
                                        {category && <img src={category.icon} alt="" />}
                                        <span className="recent-name">{food.description.toLowerCase()}</span>
                                        <span className="recent-amount">{category ? formatServing(amount, category) : amount}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </section>
            )}

            {/* Display search results */}
            {loading ? (
                <div className="results-grid">
                    {[0, 1, 2, 3].map(i => <div key={i} className="card result-card skeleton" />)}
                </div>
            ) : searchResults.length > 0 ? (
                <section aria-label="Search results">
                    <p className="results-count">{searchResults.length} results for “{searchQuery}”</p>
                    <ul className="results-grid">
                        {searchResults.map((food: FoodEntry) => {
                            const selection = selections[food.fdcId];
                            const category = categoryForServingType(selection?.servingType);
                            return (
                                <li key={food.fdcId} className="card result-card">
                                    <div className="result-top">
                                        <div>
                                            <h3>{food.description.toLowerCase()}</h3>
                                            {food.brandOwner && <p className="result-brand">{food.brandOwner}</p>}
                                        </div>
                                        {category && <div className="hand-icon small"><img src={category.icon} alt="" /></div>}
                                    </div>

                                    <dl className="macro-row">
                                        {keyNutrients.map(({ match, label }) => {
                                            const nutrient = nutrientValue(food, match);
                                            return (
                                                <div key={label}>
                                                    <dt>{label}</dt>
                                                    <dd>{nutrient ? `${Math.round(nutrient.value)}${nutrient.unitName === "KCAL" ? "" : nutrient.unitName.toLowerCase()}` : "–"}</dd>
                                                </div>
                                            );
                                        })}
                                    </dl>

                                    <div className="serving-row">
                                        <div className="field">
                                            <label htmlFor={`amount-${food.fdcId}`}>Amount</label>
                                            <input
                                                id={`amount-${food.fdcId}`}
                                                type="number"
                                                min={0.5}
                                                step={0.5}
                                                value={selection?.servingAmount ?? 1}
                                                onChange={(e) => updateSelection(food, { servingAmount: parseFloat(e.target.value) || 0 })}
                                            />
                                        </div>
                                        <div className="field grow">
                                            <label htmlFor={`type-${food.fdcId}`}>Serving type</label>
                                            <select
                                                id={`type-${food.fdcId}`}
                                                value={selection?.servingType}
                                                onChange={(e) => updateSelection(food, { servingType: e.target.value })}
                                            >
                                                {categories.map(c => (
                                                    <option key={c.key} value={c.servingType}>{c.servingType} ({c.label})</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="result-actions">
                                        <button
                                            type="button"
                                            className="btn-ghost"
                                            aria-expanded={selection?.showNutritionInfo}
                                            onClick={() => updateSelection(food, { showNutritionInfo: !selection?.showNutritionInfo })}
                                        >
                                            {selection?.showNutritionInfo ? "Hide" : "Nutrition"} info
                                        </button>
                                        <button
                                            type="button"
                                            disabled={!selection?.servingAmount}
                                            onClick={() => addSelectedFood(food)}
                                        >
                                            Add to entries
                                        </button>
                                    </div>

                                    {selection?.showNutritionInfo && (
                                        <ul className="nutrient-list">
                                            {food.foodNutrients?.filter(n => n.value > 0).map((nutrient) => (
                                                <li key={nutrient.nutrientId}>
                                                    <span>{nutrient.nutrientName}</span>
                                                    <span>{nutrient.value} {nutrient.unitName.toLowerCase()}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </section>
            ) : hasSearched && !error ? (
                <div className="empty-state">
                    <p>No results found. Try a simpler search term, or use <Link to="/">quick add</Link> on Today.</p>
                </div>
            ) : null}
        </main>
    );
}
