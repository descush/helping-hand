import { ReactNode, useState } from "react";
import FoodContext from './FoodContext';
import { FoodEntry } from "../Interface/FoodEntry";

interface Props {
    children: ReactNode; // Children components passed to the provider
}

export function FoodContextProvider({ children }: Props) {
    const [foodEntry, setFoodEntry] = useState<FoodEntry[]>([]); // State to store the food entries

    // Function to add a new food entry to the state
    function addFood(food: FoodEntry) {
        setFoodEntry(prevFoodEntry => [...prevFoodEntry, food]);
    }

    return (
        <FoodContext.Provider value={{
            foodEntry,
            addFood
        }}>
            {children} {/* Render the children components */}
        </FoodContext.Provider>
    );
}