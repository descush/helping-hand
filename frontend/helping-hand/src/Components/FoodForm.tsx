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
    const [servingSize, setServingSize] = useState<{ [key: number]: number }>({});
    const [selectedEntries, setSelectedEntries] = useState<FoodEntry[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [showDetails, setShowDetails] = useState<{ [key: number]: boolean }>({});

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

    // Function to add a selected food entry to the selectedEntries state
    function addSelectedFood(selectedFood: FoodEntry) {
        const foodWithServingSize = {
            ...selectedFood,
            servingAmount: servingSize[selectedFood.fdcId] || 0,
        };
        setSelectedEntries((prevEntries) => [...prevEntries, foodWithServingSize]);
        setSearchResults([]); // Clear the search results after adding the selected food

        // Reset serving size and search query
        setServingSize((prevServingSize) => ({
            ...prevServingSize,
            [selectedFood.fdcId]: 0,
        }));
        setSearchQuery("");
    }

    // Function to handle serving amount change
    function handleServingAmountChange(food: FoodEntry, servingAmount: number) {
        setServingSize((prevServingSize) => ({
            ...prevServingSize,
            [food.fdcId]: servingAmount,
        }));
    }

    // Function to handle serving type change
    function handleServingTypeChange(food: FoodEntry, servingType: string) {
        console.log(`Food ${food.description} serving type changed to:`, servingType);

        let updatedFood: FoodEntry = { ...food };

        switch (servingType) {
            case 'Palm':
                updatedFood.proteinAmount = food.servingAmount;
                updatedFood.proteinType = servingType;
                break;
            case 'Fist':
                updatedFood.veggiesAmount = food.servingAmount;
                updatedFood.veggiesType = servingType;
                break;
            case 'Palm':
                updatedFood.fatsAmount = food.servingAmount;
                updatedFood.fatsType = servingType;
                break;
            case 'Palm':
                updatedFood.carbsAmount = food.servingAmount;
                updatedFood.carbsType = servingType;
                break;
            default:
                break;
        }
    }

    // Function to toggle show details for a search result
    const toggleShowDetails = (fdcId: number) => {
        setShowDetails((prevShowDetails) => ({
            ...prevShowDetails,
            [fdcId]: !prevShowDetails[fdcId],
        }));
    };

    //function to submit selected entries
    function submitEntries() {
        selectedEntries.forEach((entry) => {
            const entryWithDate = {
                ...entry,
                date: new Date(selectedDate),
            };
            addEntry(entryWithDate);
        });
        setSelectedEntries([]); // Clear the selected entries
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>Date:</label>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />

                <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    type="text"
                    placeholder="Search for food..."
                />
                <button type="submit">Search</button>
            </form>

            {/* Display selected entries */}
            {selectedEntries.length > 0 && (
                <div>
                    <h2>Selected Entries</h2>
                    <ul>
                        {selectedEntries.map((entry, index) => (
                            <li key={index}>
                                <p>Food: {entry.description}</p>
                                <p>Amount: {entry.servingAmount}</p>
                            </li>
                        ))}
                    </ul>
                    <button type="button" onClick={submitEntries}>
                        Submit Entries
                    </button>
                </div>
            )}

            {/* Display search results */}
            {searchResults.length > 0 ? (
                <div>
                    <h2>Search Results</h2>
                    <ul>
                        {searchResults.map((food: FoodEntry) => (
                            <li key={food.fdcId}>
                                <h3>{food.description}</h3>
                                {!showDetails[food.fdcId] ? (
                                    <button onClick={() => toggleShowDetails(food.fdcId)}>
                                        Show More Info
                                    </button>
                                ) : (
                                    <>
                                        <button onClick={() => toggleShowDetails(food.fdcId)}>
                                            Hide Info
                                        </button>
                                        {showDetails[food.fdcId] && (
                                            <>
                                                {food.foodNutrients?.map((nutrient) => (
                                                    <p key={nutrient.nutrientId}>
                                                        {nutrient.nutrientName}: {nutrient.value} {nutrient.unitName}
                                                    </p>
                                                ))}
                                            </>
                                        )}
                                        {/* <div>
                                            <label>Serving Amount:</label>
                                            <input
                                                type="number"
                                                value={servingSize[food.fdcId] || ""}
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
                                            <button onClick={() => addSelectedFood(food)}>Add to Entries</button>
                                        </div> */}
                                    </>
                                )}
                                <div>
                                    <label>Serving Amount:</label>
                                    <input
                                        type="number"
                                        value={servingSize[food.fdcId] || ""}
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
                                    <button onClick={() => addSelectedFood(food)}>Add to Entries</button>
                                </div>
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