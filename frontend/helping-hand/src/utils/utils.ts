import { FoodEntry, FoodEntries } from "../Interface/FoodEntry";

interface TotalsByDate {
    [date: string]: {
        totalProtein: number;
        totalVeggies: number;
        totalCarbs: number;
        totalFat: number;
    };
}

export function calculateTotalsByDate(entries: FoodEntries): TotalsByDate {
    const totalsByDate: TotalsByDate = {};

    Object.entries(entries).forEach(([date, foodEntries]) => {
        foodEntries.forEach((entry) => {
            const { proteinAmount, veggiesAmount, carbsAmount, fatsAmount } = entry;

            // Initialize the totals for the date if it doesn't exist
            if (!totalsByDate[date]) {
                totalsByDate[date] = {
                    totalProtein: 0,
                    totalVeggies: 0,
                    totalCarbs: 0,
                    totalFat: 0,
                };
            }

            // Update the totals for each type
            totalsByDate[date].totalProtein += proteinAmount || 0;
            totalsByDate[date].totalVeggies += veggiesAmount || 0;
            totalsByDate[date].totalCarbs += carbsAmount || 0;
            totalsByDate[date].totalFat += fatsAmount || 0;
        });
    });

    return totalsByDate;
}