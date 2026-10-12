import { FoodEntry } from "./Interface/FoodEntry";
import { categories, categoryForServingType, CategoryKey } from "./categories";

export type DayTotals = Record<CategoryKey, number>;

export function dayKey(date: Date | string) {
    return new Date(date).toLocaleDateString();
}

export function emptyTotals(): DayTotals {
    return { protein: 0, veggies: 0, carbs: 0, fat: 0 };
}

// Servings per category for each day, keyed by dayKey
export function totalsByDay(entries: FoodEntry[]): Record<string, DayTotals> {
    const days: Record<string, DayTotals> = {};
    entries.forEach(entry => {
        const category = categoryForServingType(entry.servingType);
        if (!category || !entry.timestamp) return;
        const key = dayKey(entry.timestamp);
        days[key] = days[key] ?? emptyTotals();
        days[key][category.key] += entry.servingAmount ?? 1;
    });
    return days;
}

export function targetsHit(totals: DayTotals | undefined) {
    if (!totals) return 0;
    return categories.filter(c => totals[c.key] >= c.dailyTarget).length;
}

// Consecutive days with at least one entry, ending today
// (or yesterday, so the streak doesn't look broken first thing in the morning)
export function currentStreak(entries: FoodEntry[]): number {
    const logged = new Set(entries.map(e => dayKey(e.timestamp)));
    const day = new Date();
    if (!logged.has(dayKey(day))) day.setDate(day.getDate() - 1);

    let streak = 0;
    while (logged.has(dayKey(day))) {
        streak++;
        day.setDate(day.getDate() - 1);
    }
    return streak;
}

export const meals = ["Breakfast", "Lunch", "Dinner", "Snacks"] as const;
export type Meal = typeof meals[number];

export function mealFor(date: Date | string): Meal {
    const d = new Date(date);
    const hour = d.getHours() + d.getMinutes() / 60;
    if (hour >= 4 && hour < 10) return "Breakfast";
    if (hour >= 11 && hour < 14.5) return "Lunch";
    if (hour >= 17 && hour < 21.5) return "Dinner";
    return "Snacks";
}

// The seven days of the week containing `date`, Sunday first
export function weekOf(date: Date): Date[] {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        return d;
    });
}
