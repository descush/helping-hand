

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
import fromUnixTime from 'date-fns/fromUnixTime'

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

    // [{
    //     "carbsAmount": 1,
    //     "carbsType": "Cupped Handfuls",
    //     "servingAmount": 1,
    //     "date": "2023-07-04T00:00:00.000Z"
    // },{
    //     "carbsAmount": 1,
    //     "carbsType": "Cupped Handfuls",
    //     "servingAmount": 1,
    //     "date": "2023-07-05T00:00:00.000Z"
    // }]
    // ->
    //[
    //  123456: {
    //protein: 3
    //carbs: 2
    //},
    //  123456: {
    //protein: 3
    //carbs: 2
    //}
    //]

    let dateSet = [...new Set(props.entries.map((item) => item.date))];
    let dateTotals: { date: any; carbsTotal: number; fatsTotal: number; proteinTotal: number; veggiesTotal: number; }[] = []
    dateSet.forEach(d => {
        dateTotals.push({
            date: fromUnixTime(d / 1000).toISOString(),
            carbsTotal: props.entries.filter(e => e.date === d && e.carbsType).map(e => e.carbsAmount).reduce((acc, curr) => acc + curr, 0),
            fatsTotal: props.entries.filter(e => e.date === d && e.fatsType).map(e => e.fatsAmount).reduce((acc, curr) => acc + curr, 0),
            proteinTotal: props.entries.filter(e => e.date === d && e.proteinType).map(e => e.proteinAmount).reduce((acc, curr) => acc + curr, 0),
            veggiesTotal: props.entries.filter(e => e.date === d && e.veggiesType).map(e => e.veggiesAmount).reduce((acc, curr) => acc + curr, 0),
        })
    })

    console.log(dateTotals)

    const carbsTotal = props.entries.filter(e => e.carbsType).map(e => e.carbsAmount).reduce((acc, curr) => acc + curr, 0)
    const fatsTotal = props.entries.filter(e => e.fatsType).map(e => e.fatsAmount).reduce((acc, curr) => acc + curr, 0)
    const proteinsTotal = props.entries.filter(e => e.proteinType).map(e => e.proteinAmount).reduce((acc, curr) => acc + curr, 0)
    const veggiesTotal = props.entries.filter(e => e.veggiesType).map(e => e.veggiesAmount).reduce((acc, curr) => acc + curr, 0)


    // console.log("proteinstotal", proteinsTotal)
    // console.log("carbstotal", carbsTotal)
    // console.log("fatsbstotal", fatsTotal)
    // console.log("veggiestotal", veggiesTotal)

    console.log("Entries prop:", entries); // Log entries prop

    return (
        <div>
            {/* Renders links to the "Add Entry" and "Daily Targets" pages respectively. */}
            <Link to="/add-entry">Add Entry</Link>
            <Link to="/daily-targets">Daily Targets</Link>
            <div>
                {
                    dateTotals.map(day => (
                        <div>
                            <div><h2>{day.date}</h2></div>
                            <div className="veggiesicons">
                                <img src={fist} alt="fist" />
                                <h3>Vegetables</h3>
                                <p>{day.veggiesTotal}</p>
                            </div>
                            <div className="carbsicons">
                                <img src={cuppedHand} alt="cupped hand" />
                                <h3>Carbohydrates</h3>
                                <p>{day.carbsTotal}</p>
                            </div>
                            <div className="proteinicons">
                                <img src={palm} alt="palm" />
                                <h3>Protein</h3>
                                <p>{day.proteinTotal}</p>
                            </div>
                            <div className="fatsicons">
                                <img src={thumb} alt="thunb" />
                                <h3>Fats</h3>
                                <p>{day.fatsTotal}</p>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* <div className="dailyentriesviewer">
            
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
 */}

        </div>
    );
}
