import axios from "axios";
import { FoodEntry } from "../Interface/FoodEntry";

// Function to retrieve food data from the USDA API
export function getFood(searchQuery: string): Promise<any> {
    const apiKey = "UGxFWbRbmPW0QfYnbAmGna4tH017KBN6NasEtfMu";
    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${searchQuery}`;
    return axios.get(url).then((response) => {
        const foodResults: FoodEntry[] = response.data.foods; // Assuming the food entries are present in the `foods` property of the API response
        return foodResults;
    });
}

// Function to retrieve all entries from the server
export function getAllEntries() {
    return axios.get('http://127.0.0.1:5001/helping-hand-journal/us-central1/api/entries').then(response => response.data);
}

// Function to retrieve a specific entry from the server
export function getEntry(id: string) {
    return axios.get(`http://127.0.0.1:5001/helping-hand-journal/us-central1/api/entries/${id}`).then(response => response.data);
}

// Function to update an entry on the server
export function updateEntry(foodEntry: FoodEntry, id: string) {
    return axios.put(`http://127.0.0.1:5001/helping-hand-journal/us-central1/api/entries/${id}`, foodEntry).then(response => response.data);
}

// Function to add a new entry to the server
export async function addEntry(foodEntry: FoodEntry) {
    const response = await axios.post('http://127.0.0.1:5001/helping-hand-journal/us-central1/api/entries', foodEntry);
    return response.data;
}

// Function to delete an entry from the server
export function deleteEntry(id: string) {
    return axios.delete(`http://127.0.0.1:5001/helping-hand-journal/us-central1/api/entries/${id}`).then(response => response.data);
}