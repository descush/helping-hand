import { ReactNode, useState, useEffect } from "react";
import FoodContext from "./FoodContext";
import { FoodEntry } from "../Interface/FoodEntry";

interface Props {
    children: ReactNode;
}

export function FoodContextProvider({ children }: Props) {
    const [foodEntry, setFoodEntry] = useState<FoodEntry[]>([]);
    const [dailyProteinSubmissions, setDailyProteinSubmissions] = useState<Record<string, number>>({});
    const [dailyVeggieSubmissions, setDailyVeggieSubmissions] = useState<Record<string, number>>({});
    const [dailyCarbSubmissions, setDailyCarbSubmissions] = useState<Record<string, number>>({});
    const [dailyFatSubmissions, setDailyFatSubmissions] = useState<Record<string, number>>({});

    useEffect(() => {
        function calculateDailySubmissions() {
            const currentDate = new Date().toLocaleDateString();

            // Reset the daily submissions counts
            setDailyProteinSubmissions({});
            setDailyVeggieSubmissions({});
            setDailyCarbSubmissions({});
            setDailyFatSubmissions({});

            foodEntry.forEach((entry) => {
                if (entry.timestamp) {
                    const entryDate = entry.timestamp.toLocaleDateString();

                    // Update the daily submissions counts for each category
                    if (entryDate === currentDate) {
                        setDailyProteinSubmissions((prevSubmissions) => ({
                            ...prevSubmissions,
                            [entryDate]: (prevSubmissions[entryDate] || 0) + 1
                        }));

                        setDailyVeggieSubmissions((prevSubmissions) => ({
                            ...prevSubmissions,
                            [entryDate]: (prevSubmissions[entryDate] || 0) + 1
                        }));

                        setDailyCarbSubmissions((prevSubmissions) => ({
                            ...prevSubmissions,
                            [entryDate]: (prevSubmissions[entryDate] || 0) + 1
                        }));

                        setDailyFatSubmissions((prevSubmissions) => ({
                            ...prevSubmissions,
                            [entryDate]: (prevSubmissions[entryDate] || 0) + 1
                        }));
                    }
                }
            });
        }

        // Calculate the daily submissions whenever the foodEntry array changes
        calculateDailySubmissions();
    }, [foodEntry]);

    function addFood(food: FoodEntry) {
        setFoodEntry((prevFoodEntry) => [...prevFoodEntry, food]);
    }

    return (
        <FoodContext.Provider
            value={{
                foodEntry,
                addFood,
                dailyProteinSubmissions,
                dailyVeggieSubmissions,
                dailyCarbSubmissions,
                dailyFatSubmissions
            }}
        >
            {children}
        </FoodContext.Provider>
    );
}