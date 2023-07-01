import { Link, Route, Routes } from "react-router-dom";
import { DailyTargets } from "../DailyTargets/DailyTargets";
import Entry from "../../../../../backend/functions/src/models/Entry"
import { Login } from "../Login/Login";
import { FoodForm } from "../FoodForm";
import { DailyEntriesViewer } from "../DailyEntriesViewer/DailyEntriesViewer";
import { useState } from "react";
// import "../DailyEntriesViewer/DailyEntriesViewer.css"






interface HomeProps {   // this defines the prop type for the 'Home' component
    entries: Entry[]; // Add entries prop
}

export function Home(props: HomeProps ) {  // This is declaring the 'home' component that recieves the 'HomeProps' as its props
    const { entries } = props;

    const [numberOfCuppedHandCarbs, setNumberOfCuppedHandCarbs] = useState<number[]>([])
    const [numberOfThumbFats, setNumberOfThumbFats] = useState<any[]>([])
    const [numberOfPalmProteins, setNumberOfPalmProteins] = useState<any[]>([])
    const [numberOfFistVeggies, setNumberOfFistVeggies] = useState<any[]>([])

    console.log("Entries prop:", entries); // Log entries prop

    return (
        <div>
            {/*  Renders links to the "Add Entry" and "Daily Targets" pages respectively. */}
            <Link to="/add-entry">Add Entry</Link>
            <Link to="/daily-targets">Daily Targets</Link>
           
            <div className="dailyentriesviewer">
                {
                    entries.map((entry) => (
                        <DailyEntriesViewer entry={entry}></DailyEntriesViewer>
                    ))
                }
            </div>
            
        </div>
    );
}