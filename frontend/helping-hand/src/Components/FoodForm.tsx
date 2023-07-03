import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import FoodContext from "../Context/FoodContext";
import { FoodEntry } from "../Interface/FoodEntry";
import { getFood } from "../Services/FoodService";
import { addEntry } from "../Services/FoodService";

export function FoodForm() {
    const { addFood } = useContext(FoodContext);

    // State for form inputs
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchResults, setSearchResults] = useState<FoodEntry[]>([]);
    const [showNutritionInfo, setShowNutritionInfo] = useState(false);

    // Form submission handler
    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            console.log("Submitting form with search query:", searchQuery);

            const response = await getFood(searchQuery);
            console.log("API response:", response);

            if (Array.isArray(response)) {
                setSearchResults(response);
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.error("Error fetching food data:", error);
        }
    }

    // Function to add a selected food entry to the context
    function addSelectedFood(selectedFood: FoodEntry) {
        addEntry(selectedFood);
        addFood(selectedFood);
        setSearchResults([]); // Clear the search results after adding the selected food
    }

    // Function to handle serving amount change
    function handleServingAmountChange(food: FoodEntry, servingAmount: number) {
        console.log(`Food ${food.description} serving amount changed to:`, servingAmount);
    }

    // Function to handle serving type change
    function handleServingTypeChange(food: FoodEntry, servingType: string) {
        console.log(`Food ${food.description} serving type changed to:`, servingType);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    type="text"
                    placeholder="Search for food..."
                />
                <button type="submit">Search</button>
            </form>
            {/* Display search results */}
            {searchResults.length > 0 ? (
                <div>
                    <h2>Search Results</h2>
                    <ul>
                        {searchResults.map((food: FoodEntry) => (
                            <li key={food.fdcId}>
                                <h3>{food.description}</h3>
                                <button onClick={() => setShowNutritionInfo(!showNutritionInfo)}>
                                    Nutrition Info
                                </button>
                                {showNutritionInfo && (
                                    <div>
                                        {food.foodNutrients?.map((nutrient) => (
                                            <p key={nutrient.nutrientId}>
                                                {nutrient.nutrientName}: {nutrient.value} {nutrient.unitName}
                                            </p>
                                        ))}
                                    </div>
                                )}
                                <div>
                                    <label>Serving Amount:</label>
                                    <input
                                        type="number"
                                        value={food.servingAmount}
                                        onChange={(e) =>
                                            handleServingAmountChange(food, parseInt(e.target.value))
                                        }
                                    />
                                    <label>Serving Type:</label>
                                    <select
                                        value={food.servingType}
                                        onChange={(e) => handleServingTypeChange(food, e.target.value)}
                                    >
                                        <option value="Palm">Palm</option>
                                        <option value="Fist">Fist</option>
                                        <option value="Thumb">Thumb</option>
                                        <option value="Cupped Handfuls">Cupped Handfuls</option>
                                    </select>
                                </div>


                                <button onClick={() => addSelectedFood(food)}>Add to Entries</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No results found.</p>
            )}
            {/* Rest of the form inputs */}
            {/* ... */}
            <Link to={'/'}><button>Home</button></Link>
        </div>
    );
}