import { createContext } from "react";
import { FoodEntry } from "../Interface/FoodEntry";

export type EntryMode = "guest" | "user" | "demo";

// Define the model for the FoodContext
interface FoodContextModel {
    foodEntry: FoodEntry[]; // Array of FoodEntry objects
    entriesReady: boolean; // false while entries are loading
    mode: EntryMode; // where entries are stored
    addFood: (food: FoodEntry) => Promise<FoodEntry | undefined>; // Add (or restore) an entry
    updateFood: (id: string, changes: Partial<FoodEntry>) => void;
    removeFood: (id: string) => void;
    dailyProteinSubmissions: Record<string, number>; // Daily protein submissions
    dailyVeggieSubmissions: Record<string, number>; // Daily veggie submissions
    dailyCarbSubmissions: Record<string, number>; // Daily carb submissions
    dailyFatSubmissions: Record<string, number>; // Daily fat submissions
    hasStarted: boolean; // false until the visitor signs in, starts as a guest, or opens the demo
    startAsGuest: () => void;
    startDemo: () => void;
    exitDemo: () => void;
}

// Set the default values for the FoodContext
const defaultValues: FoodContextModel = {
    foodEntry: [], // Default empty array of food entries
    entriesReady: false,
    mode: "guest",
    addFood: async () => undefined,
    updateFood: () => { },
    removeFood: () => { },
    dailyProteinSubmissions: {},
    dailyVeggieSubmissions: {},
    dailyCarbSubmissions: {},
    dailyFatSubmissions: {},
    hasStarted: false,
    startAsGuest: () => { },
    startDemo: () => { },
    exitDemo: () => { },
}



// Create the FoodContext
const FoodContext = createContext(defaultValues);
export default FoodContext;
