import { ReactNode, useState, useEffect } from "react";
import FoodContext from "./FoodContext";
import { FoodEntry } from "../Interface/FoodEntry";
import axios from "axios";

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
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        try {
            const response = await axios.get<FoodEntry[]>(
                "http://127.0.0.1:5001/helping-hand-journal/us-central1/api/entries"
            );
            setFoodEntry(response.data);
        } catch (error) {
            console.error("Error fetching food entries:", error);
        }
    };

    // useEffect(() => {
    //     calculateDailySubmissions();
    // }, [foodEntry]);

    // function calculateDailySubmissions() {
    //     const currentDate = new Date().toLocaleDateString();

    //     // Reset the daily submissions counts
    //     setDailyProteinSubmissions({});
    //     setDailyVeggieSubmissions({});
    //     setDailyCarbSubmissions({});
    //     setDailyFatSubmissions({});

    //     foodEntry.forEach((entry) => {
    //         if (entry.timestamp) {
    //             const entryDate = entry.timestamp.toLocaleDateString();

    //             // Update the daily submissions counts for each category
    //             if (entryDate === currentDate) {
    //                 setDailyProteinSubmissions((prevSubmissions) => ({
    //                     ...prevSubmissions,
    //                     [entryDate]: (prevSubmissions[entryDate] || 0) + 1
    //                 }));

    //                 setDailyVeggieSubmissions((prevSubmissions) => ({
    //                     ...prevSubmissions,
    //                     [entryDate]: (prevSubmissions[entryDate] || 0) + 1
    //                 }));

    //                 setDailyCarbSubmissions((prevSubmissions) => ({
    //                     ...prevSubmissions,
    //                     [entryDate]: (prevSubmissions[entryDate] || 0) + 1
    //                 }));

    //                 setDailyFatSubmissions((prevSubmissions) => ({
    //                     ...prevSubmissions,
    //                     [entryDate]: (prevSubmissions[entryDate] || 0) + 1
    //                 }));
    //             }
    //         }
    //     });
    // }

    async function addFood(food: FoodEntry) {
        try {
            const response = await axios.post(
                "http://127.0.0.1:5001/helping-hand-journal/us-central1/api/entries",
                food
            );
            setFoodEntry((prevFoodEntry) => [...prevFoodEntry, response.data]);
            console.log(foodEntry);
        } catch (error) {
            console.error("Error adding food entry:", error);
        }
    }

    return (
        <FoodContext.Provider
            value={{
                foodEntry,
                addFood,
                dailyProteinSubmissions,
                dailyVeggieSubmissions,
                dailyCarbSubmissions,
                dailyFatSubmissions,
                setDailyProteinSubmissions,
                setDailyVeggieSubmissions,
                setDailyCarbSubmissions,
                setDailyFatSubmissions
            }}
        >
            {children}
        </FoodContext.Provider>
    );
}