export interface FoodEntry {
    id?: string; // set once the entry is saved
    timestamp: Date;
    fdcId: number;
    description: string;
    brandOwner?: string; // set on branded foods from the USDA search
    servingAmount?: number;
    servingType?: string;
    foodNutrients?: {
        nutrientId: number;
        nutrientName: string;
        nutrientNumber: string;
        unitName: string;
        derivationCode: string;
        derivationDescription: string;
        derivationId: number;
        value: number;
        foodNutrientSourceId: number;
        foodNutrientSourceCode: string;
        foodNutrientSourceDescription: string;
        rank: number;
        indentLevel: number;
        foodNutrientId: number;
        percentDailyValue?: number;
    }[];
}



export interface FoodEntries {
    [date: string]: FoodEntry[];
}