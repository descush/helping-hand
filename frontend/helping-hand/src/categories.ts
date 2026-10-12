import cuppedHand from './Assets/cuppedHand.png';
import fist from './Assets/fist.png';
import palm from './Assets/palm.png';
import thumb from './Assets/thumb.png';

export type CategoryKey = 'protein' | 'veggies' | 'carbs' | 'fat';

export interface Category {
    key: CategoryKey;
    label: string;
    servingType: string; // matches the serving type stored on a FoodEntry
    unit: string;
    icon: string;
    dailyTarget: number;
    dailyLabel: string;
    perMeal: string;
}

// Hand-portion categories and their daily targets
export const categories: Category[] = [
    { key: 'protein', label: 'Protein', servingType: 'Palm', unit: 'palms', icon: palm, dailyTarget: 6, dailyLabel: '6 palms', perMeal: '1–2' },
    { key: 'veggies', label: 'Veggies', servingType: 'Fist', unit: 'fists', icon: fist, dailyTarget: 6, dailyLabel: '4–6 fists', perMeal: '1–2' },
    { key: 'carbs', label: 'Carbs', servingType: 'Cupped Handfuls', unit: 'cupped hands', icon: cuppedHand, dailyTarget: 3, dailyLabel: '3 cupped hands', perMeal: '0–1' },
    { key: 'fat', label: 'Fat', servingType: 'Thumb', unit: 'thumbs', icon: thumb, dailyTarget: 3, dailyLabel: '3 thumbs', perMeal: '0–1' },
];

// "1 palm", "2 palms", "1.5 cupped hands"
export function formatServing(amount: number, category: Category): string {
    return `${amount} ${amount === 1 ? category.unit.replace(/s$/, '') : category.unit}`;
}

export function categoryForServingType(servingType?: string): Category | undefined {
    return categories.find(c => c.servingType === servingType);
}
