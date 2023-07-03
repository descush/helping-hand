import { Link, Route, Routes } from "react-router-dom";
import { DailyTargets } from "../DailyTargets/DailyTargets";
import Entry from "../../../../../backend/functions/src/models/Entry"
import { Login } from "../Login/Login";
import { FoodForm } from "../FoodForm";
import { DailyEntriesViewer } from "../DailyEntriesViewer/DailyEntriesViewer";
import { useState } from "react";
import { calculateTotalsByDate } from "../../utils/utils";
import { FoodEntries } from "../../Interface/FoodEntry";
// import "../DailyEntriesViewer/DailyEntriesViewer.css"


interface HomeProps {   // this defines the prop type for the 'Home' component
    entries: Entry[]; // Add entries prop
}

export function Home(props: HomeProps) {
    const { entries } = props;


    const foodEntries: FoodEntries = entries.reduce((acc: FoodEntries, entry: Entry) => {
        if (entry.date instanceof Date && !isNaN(entry.date.getTime())) {
            const date = entry.date.toISOString().split('T')[0];
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(entry);
            console.log(acc[date], entry)
        }
        return acc;
    }, {});

    const totalsByDate = calculateTotalsByDate(foodEntries); // Calculate the totals


    const [numberOfCuppedHandCarbs, setNumberOfCuppedHandCarbs] = useState<number[]>([]);
    const [numberOfThumbFats, setNumberOfThumbFats] = useState<any[]>([]);
    const [numberOfPalmProteins, setNumberOfPalmProteins] = useState<any[]>([]);
    const [numberOfFistVeggies, setNumberOfFistVeggies] = useState<any[]>([]);

    console.log("Entries prop:", entries); // Log entries prop

    return (
        //     <div>
        //         {/* Renders links to the "Add Entry" and "Daily Targets" pages respectively. */}
        //         <Link to="/add-entry">Add Entry</Link>
        //         <Link to="/daily-targets">Daily Targets</Link>

        //         <div className="dailyentriesviewer">
        //             {/* Add entries rendering */}
        //             {entries.length > 0 ? (
        //                 entries.map((entry) => (
        //                     <DailyEntriesViewer entry={entry} />
        //                 ))
        //             ) : (
        //                 <p>No entries available.</p>
        //             )}
        //         </div>
        //     </div>
        // );
        <div>
            <Link to="/add-entry">Add Entry</Link>
            <Link to="/daily-targets">Daily Targets</Link>
            <div className="dailyentriesviewer">
                {/* Render totals for each date */}
                {Object.keys(totalsByDate).map((date) => (
                    <div key={date}>
                        <h2>Date: {date}</h2>
                        <p>Total Protein: {totalsByDate[date].totalProtein}</p>
                        <p>Total Veggies: {totalsByDate[date].totalVeggies}</p>
                        <p>Total Carbs: {totalsByDate[date].totalCarbs}</p>
                        <p>Total Fat: {totalsByDate[date].totalFat}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
