import { Link, Route, Routes } from "react-router-dom";
import { DailyTargets } from "../DailyTargets/DailyTargets";
import Entry from "../../../../../backend/functions/src/models/Entry"
import { Login } from "../Login/Login";
import { FoodForm } from "../FoodForm";
import { DailyEntriesViewer } from "../DailyEntriesViewer/DailyEntriesViewer";

interface HomeProps {   // this defines the prop type for the 'Home' component
    entries: Entry[]; // Add entries prop

}

export function Home(props: HomeProps, {entry: Entry} ) {  // This is declaring the 'home' component that recieves the 'HomeProps' as its props
    const { entries } = props;

    console.log("Entries prop:", entries); // Log entries prop

    return (
        <div>
            {/*  Renders links to the "Add Entry" and "Daily Targets" pages respectively. */}
            <Link to="/add-entry">Add Entry</Link>
            <Link to="/daily-targets">Daily Targets</Link>
            <div>
                {/* Add entries rendering */}
                {entries.length > 0 ? ( // rendering based on length 
                    entries.map((entry) => (
                        // Sets the key prop of each rendered entry to the _id of the entry. This helps React efficiently update the list of entries when changes occur.
                        <div key={entry._id?.toString()}>
                            {/*Renders various properties of the entry object within appropriate HTML elements.  */}
                            <h3>Entry ID: {entry._id?.toString()}</h3>
                            <p>Protein Amount: {entry.proteinAmount}</p>
                            <p>Protein Type: {entry.proteinType}</p>
                            <p>Veggies Amount: {entry.veggiesAmount}</p>
                            <p>Veggies Type: {entry.veggiesType}</p>
                            <p>Fats Amount: {entry.fatsAmount}</p>
                            <p>Fats Type: {entry.fatsType}</p>
                            <p>Carbs Amount: {entry.carbsAmount}</p>
                            <p>Carbs Type: {entry.carbsType}</p>
                        </div>
                    ))
                ) : (
                    <p>No entries found.</p>
                )}

            

            </div>

            <DailyEntriesViewer entry={Entry} />
        </div>
    );
}