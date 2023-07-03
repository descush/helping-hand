import { createContext } from "react";
import { FoodEntry } from "../Interface/FoodEntry";


// Define the model for the FoodContext
interface FoodContextModel {
    foodEntry: FoodEntry[]; // Array of FoodEntry objects
    addFood: (food: FoodEntry) => void; // Function to add a new food entry
    dailyProteinSubmissions: Record<string, number>; // Daily protein submissions
    dailyVeggieSubmissions: Record<string, number>; // Daily veggie submissions
    dailyCarbSubmissions: Record<string, number>; // Daily carb submissions
    dailyFatSubmissions: Record<string, number>; // Daily fat submissions
}

// Set the default values for the FoodContext
const defaultValues: FoodContextModel = {
    foodEntry: [], // Default empty array of food entries
    addFood: () => { }, // Default empty function for adding food entry
    dailyProteinSubmissions: {},
    dailyVeggieSubmissions: {},
    dailyCarbSubmissions: {},
    dailyFatSubmissions: {}
}



// Create the FoodContext
const FoodContext = createContext(defaultValues);
export default FoodContext;