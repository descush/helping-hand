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
    return axios.get('https://us-central1-helping-hand-journal.cloudfunctions.net/api/entries').then(response => response.data);
}

// Function to retrieve a specific entry from the server
export function getEntry(id: string) {
    return axios.get(`https://us-central1-helping-hand-journal.cloudfunctions.net/api/entries/${id}`).then(response => response.data);
}

// Function to update an entry on the server
export function updateEntry(foodEntry: FoodEntry, id: string) {
    return axios.put(`https://us-central1-helping-hand-journal.cloudfunctions.net/api/entries/${id}`, foodEntry).then(response => response.data);
}

// Function to add a new entry to the server
export async function addEntry(foodEntry: FoodEntry) {
    const response = await axios.post('https://us-central1-helping-hand-journal.cloudfunctions.net/api/entries', foodEntry);
    return response.data;
}

// Function to delete an entry from the server
export function deleteEntry(id: string) {
    return axios.delete(`https://us-central1-helping-hand-journal.cloudfunctions.net/api/entries/${id}`).then(response => response.data);
}
