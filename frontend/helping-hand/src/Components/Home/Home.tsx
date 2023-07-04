import { Link } from "react-router-dom";
import Entry from "../../../../../backend/functions/src/models/Entry"
import { Login } from "../Login/Login";
import { FoodForm } from "../FoodForm";
import { DailyEntriesViewer } from "../DailyEntriesViewer/DailyEntriesViewer";
import { useState } from "react";
// import "../DailyEntriesViewer/DailyEntriesViewer.css"






interface HomeProps {   // this defines the prop type for the 'Home' component
    entries: Entry[]; // Add entries prop
}

export function Home(props: HomeProps) {
    const { entries } = props;

    const [numberOfCuppedHandCarbs, setNumberOfCuppedHandCarbs] = useState<number[]>([]);
    const [numberOfThumbFats, setNumberOfThumbFats] = useState<any[]>([]);
    const [numberOfPalmProteins, setNumberOfPalmProteins] = useState<any[]>([]);
    const [numberOfFistVeggies, setNumberOfFistVeggies] = useState<any[]>([]);

    console.log("Entries prop:", entries); // Log entries prop

    return (
        <div>
            {/* Renders links to the "Add Entry" and "Daily Targets" pages respectively. */}
            <Link to="/add-entry">Add Entry</Link>
            <Link to="/daily-targets">Daily Targets</Link>

            <div className="dailyentriesviewer">
                {/* Add entries rendering */}
                {entries.length > 0 ? (
                    entries.map((entry) => (
                        <DailyEntriesViewer entry={entry} entries={props.entries} />
                    ))
                ) : (
                    <p>No entries available.</p>
                )}
            </div>
        </div>
    );
}
