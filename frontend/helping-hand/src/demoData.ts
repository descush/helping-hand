import { FoodEntry } from "./Interface/FoodEntry";

// Sample entries for previewing the app with data ("Try the demo" or ?demo in the URL)

type Macros = [number, number, number, number]; // [calories, protein g, carbs g, fat g]

interface SampleFood {
    description: string;
    servingType: string;
    macros: Macros;
}

// Today: a realistic day that leaves some targets open and hits one
const today: (SampleFood & { servingAmount: number; hour: number; minute: number })[] = [
    { description: "Scrambled eggs", servingType: "Palm", servingAmount: 1, hour: 7, minute: 45, macros: [148, 10, 2, 11] },
    { description: "Rolled oats", servingType: "Cupped Handfuls", servingAmount: 1, hour: 7, minute: 50, macros: [379, 13, 68, 7] },
    { description: "Blueberries, raw", servingType: "Fist", servingAmount: 1, hour: 7, minute: 52, macros: [57, 1, 14, 0] },
    { description: "Almonds", servingType: "Thumb", servingAmount: 1, hour: 10, minute: 30, macros: [579, 21, 22, 50] },
    { description: "Grilled chicken breast", servingType: "Palm", servingAmount: 2, hour: 12, minute: 20, macros: [165, 31, 0, 4] },
    { description: "Spinach salad", servingType: "Fist", servingAmount: 2, hour: 12, minute: 22, macros: [23, 3, 4, 0] },
    { description: "Brown rice, cooked", servingType: "Cupped Handfuls", servingAmount: 1, hour: 12, minute: 25, macros: [123, 3, 26, 1] },
    { description: "Olive oil", servingType: "Thumb", servingAmount: 1, hour: 12, minute: 26, macros: [884, 0, 0, 100] },
    { description: "Greek yogurt, plain", servingType: "Palm", servingAmount: 1, hour: 15, minute: 10, macros: [59, 10, 4, 0] },
    { description: "Avocado", servingType: "Thumb", servingAmount: 1, hour: 18, minute: 30, macros: [160, 2, 9, 15] },
];

// Foods the generated history picks from
const pool: Record<string, SampleFood[]> = {
    Palm: [
        { description: "Salmon fillet", servingType: "Palm", macros: [208, 20, 0, 13] },
        { description: "Turkey breast", servingType: "Palm", macros: [135, 30, 0, 1] },
        { description: "Tofu, firm", servingType: "Palm", macros: [144, 17, 3, 9] },
        { description: "Scrambled eggs", servingType: "Palm", macros: [148, 10, 2, 11] },
        { description: "Greek yogurt, plain", servingType: "Palm", macros: [59, 10, 4, 0] },
    ],
    Fist: [
        { description: "Broccoli, steamed", servingType: "Fist", macros: [35, 2, 7, 0] },
        { description: "Mixed greens", servingType: "Fist", macros: [20, 2, 3, 0] },
        { description: "Roasted carrots", servingType: "Fist", macros: [41, 1, 10, 0] },
        { description: "Bell peppers", servingType: "Fist", macros: [31, 1, 6, 0] },
    ],
    "Cupped Handfuls": [
        { description: "Quinoa, cooked", servingType: "Cupped Handfuls", macros: [120, 4, 21, 2] },
        { description: "Sweet potato", servingType: "Cupped Handfuls", macros: [86, 2, 20, 0] },
        { description: "Whole wheat pasta", servingType: "Cupped Handfuls", macros: [149, 6, 30, 2] },
        { description: "Banana", servingType: "Cupped Handfuls", macros: [89, 1, 23, 0] },
    ],
    Thumb: [
        { description: "Peanut butter", servingType: "Thumb", macros: [588, 25, 20, 50] },
        { description: "Olive oil", servingType: "Thumb", macros: [884, 0, 0, 100] },
        { description: "Cheddar cheese", servingType: "Thumb", macros: [403, 25, 1, 33] },
        { description: "Walnuts", servingType: "Thumb", macros: [654, 15, 14, 65] },
    ],
};

// Daily target per serving type, and the meal times servings get spread across
const targets: Record<string, number> = { Palm: 6, Fist: 5, "Cupped Handfuls": 3, Thumb: 3 };
const mealTimes: [number, number][] = [[8, 5], [12, 40], [18, 50], [15, 30]];

// Deterministic pseudo-random numbers so the demo looks the same on every load
function seeded(seed: number) {
    let s = seed;
    return () => {
        s = (s * 9301 + 49297) % 233280;
        return s / 233280;
    };
}

function toEntry(food: SampleFood, servingAmount: number, timestamp: Date, fdcId: number): FoodEntry {
    const [calories, protein, carbs, fat] = food.macros;
    const nutrient = (nutrientId: number, nutrientName: string, unitName: string, value: number) =>
        ({ nutrientId, nutrientName, unitName, value } as NonNullable<FoodEntry["foodNutrients"]>[number]);
    return {
        fdcId,
        description: food.description,
        servingType: food.servingType,
        servingAmount,
        timestamp,
        foodNutrients: [
            nutrient(1008, "Energy", "KCAL", calories),
            nutrient(1003, "Protein", "G", protein),
            nutrient(1005, "Carbohydrate, by difference", "G", carbs),
            nutrient(1004, "Total lipid (fat)", "G", fat),
        ],
    };
}

// The previous 13 days, with one missed day so the streak isn't perfect
function history(): FoodEntry[] {
    const entries: FoodEntry[] = [];
    const random = seeded(42);
    let fdcId = 910000;

    for (let daysAgo = 13; daysAgo >= 1; daysAgo--) {
        if (daysAgo === 10) continue;
        const day = new Date();
        day.setDate(day.getDate() - daysAgo);

        for (const [servingType, target] of Object.entries(targets)) {
            // Mostly on target, sometimes a little under or over
            let remaining = Math.max(1, target + Math.floor(random() * 4) - 2);
            let meal = 0;
            while (remaining > 0) {
                const amount = Math.min(remaining, random() > .6 ? 2 : 1);
                const options = pool[servingType];
                const food = options[Math.floor(random() * options.length)];
                const [hour, minute] = mealTimes[meal % mealTimes.length];
                const timestamp = new Date(day);
                timestamp.setHours(hour, minute + Math.floor(random() * 10), 0, 0);
                entries.push(toEntry(food, amount, timestamp, fdcId++));
                remaining -= amount;
                meal++;
            }
        }
    }
    return entries;
}

export function isDemoMode(): boolean {
    return new URLSearchParams(window.location.search).has("demo");
}

// Two weeks of sample entries ending with a full day today
export function getDemoEntries(): FoodEntry[] {
    const todays = today.map((food, index) => {
        const timestamp = new Date();
        timestamp.setHours(food.hour, food.minute, 0, 0);
        return toEntry(food, food.servingAmount, timestamp, 900000 + index);
    });
    return [...history(), ...todays];
}
