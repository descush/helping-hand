import { createContext } from "react";
import { FoodEntry } from "../Interface/FoodEntry";

// Define the model for the FoodContext
interface FoodContextModel {
    foodEntry: FoodEntry[]; // Array of FoodEntry objects
    addFood: (food: FoodEntry) => void; // Function to add a new food entry
}

// Set the default values for the FoodContext
const defaultValues: FoodContextModel = {
    foodEntry: [], // Default empty array of food entries
    addFood: () => { } // Default empty function for adding food entry
}

// Create the FoodContext
const FoodContext = createContext(defaultValues);
export default FoodContext;