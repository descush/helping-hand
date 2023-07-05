import { Link } from "react-router-dom";
import Entry from "../../../../../backend/functions/src/models/Entry"
import { Login } from "../Login/Login";
import { FoodForm } from "../FoodForm";
import { DailyEntriesViewer } from "../DailyEntriesViewer/DailyEntriesViewer";
import { useState } from "react";
import fist from '../../Assets/fist.png';
import cuppedHand from '../../Assets/cuppedHand.png';
import thumb from '../../Assets/thumb.png';
import palm from '../../Assets/palm.png';
// import "../DailyEntriesViewer/DailyEntriesViewer.css"






interface HomeProps {   // this defines the prop type for the 'Home' component
    entries: Entry[]; // Add entries prop
}

export function Home(props: HomeProps) {
    const { entries } = props;

    // const [numberOfCuppedHandCarbs, setNumberOfCuppedHandCarbs] = useState<number[]>([]);
    // const [numberOfThumbFats, setNumberOfThumbFats] = useState<any[]>([]);
    // const [numberOfPalmProteins, setNumberOfPalmProteins] = useState<any[]>([]);
    // const [numberOfFistVeggies, setNumberOfFistVeggies] = useState<any[]>([]);

    const carbsTotal = props.entries.filter(e => e.carbsType).map(e => e.carbsAmount).reduce((acc, curr) => acc + curr, 0)
    const fatsTotal = props.entries.filter(e => e.fatsType).map(e => e.fatsAmount).reduce((acc, curr) => acc + curr, 0)
    const proteinsTotal = props.entries.filter(e => e.proteinType).map(e => e.proteinAmount).reduce((acc, curr) => acc + curr, 0)
    const veggiesTotal = props.entries.filter(e => e.veggiesType).map(e => e.veggiesAmount).reduce((acc, curr) => acc + curr, 0)
  
  
    console.log("proteinstotal", proteinsTotal)
    console.log("carbstotal", carbsTotal)
    console.log("fatsbstotal", fatsTotal)
    console.log("veggiestotal", veggiesTotal)

    console.log("Entries prop:", entries); // Log entries prop

    return (
        <div>
            {/* Renders links to the "Add Entry" and "Daily Targets" pages respectively. */}
            <Link to="/add-entry">Add Entry</Link>
            <Link to="/daily-targets">Daily Targets</Link>

            <div className="dailyentriesviewer">

            <div className="veggiesicons">
                    <img src={fist} alt="fist" />
                    <h3>Vegetables</h3>
                    <p>{veggiesTotal}</p>
                </div>
                <div className="carbsicons">
                    <img src={cuppedHand} alt="cupped hand" />
                    <h3>Carbohydrates</h3>
                    <p>{carbsTotal}</p>
                </div>
                <div className="proteinicons">
                    <img src={palm} alt="palm" />
                    <h3>Protein</h3>
                    <p>{proteinsTotal}</p>
                </div>
                <div className="fatsicons">
                    <img src={thumb} alt="thunb" />
                    <h3>Fats</h3>
                    <p>{fatsTotal}</p>
                </div>






                

                







                
                {/* {entries.length > 0 ? (
                    entries.map((entry) => (
                        <DailyEntriesViewer entry={entry} entries={props.entries} />
                    ))
                ) 
                
                : (
                    <p>No entries available.</p>
                )} */}


                
            </div>
        </div>
    );
}
