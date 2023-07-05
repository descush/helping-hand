import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import Modal from 'react-modal';
import Entry from "../../../../../backend/functions/src/models/Entry"
import fist from '../../Assets/fist.png';
import cuppedHand from '../../Assets/cuppedHand.png';
import thumb from '../../Assets/thumb.png';
import palm from '../../Assets/palm.png';
import fromUnixTime from 'date-fns/fromUnixTime'
import './Home.css';
import { DarkThemeContext } from "../../Context/DarkThemeContext";



interface HomeProps {   // this defines the prop type for the 'Home' component
    entries: Entry[]; // Add entries prop
}

export function Home(props: HomeProps) {
    const { entries } = props;
    const { darkTheme } = useContext(DarkThemeContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    let dateSet = [...new Set(props.entries.map((item) => item.date))] as number[];
    dateSet.sort((a, b) => b - a);
    dateSet = dateSet.slice(0, 7);

    let dateTotals: {
        date: any;
        carbsTotal: number;
        fatsTotal: number;
        proteinTotal: number;
        veggiesTotal: number;
    }[] = [];

    dateSet.forEach((d) => {
        dateTotals.push({
            date: fromUnixTime(d / 1000).toLocaleDateString('en-US', {
                timeZone: 'UTC',
                month: 'long',
                day: '2-digit',
                year: 'numeric',
            }),
            carbsTotal: props.entries
                .filter((e) => e.date === d && e.carbsType)
                .map((e) => e.carbsAmount)
                .reduce((acc, curr) => acc + curr, 0),
            fatsTotal: props.entries
                .filter((e) => e.date === d && e.fatsType)
                .map((e) => e.fatsAmount)
                .reduce((acc, curr) => acc + curr, 0),
            proteinTotal: props.entries
                .filter((e) => e.date === d && e.proteinType)
                .map((e) => e.proteinAmount)
                .reduce((acc, curr) => acc + curr, 0),
            veggiesTotal: props.entries
                .filter((e) => e.date === d && e.veggiesType)
                .map((e) => e.veggiesAmount)
                .reduce((acc, curr) => acc + curr, 0),
        });
    });

    // Function to determine the class name based on the conditions
    const getClass = (amount: number, condition: number, orangeCondition: number): string => {
        if (amount === condition) {
            return 'green';
        } else if (amount > orangeCondition) {
            return 'orange';
        }
        return '';
    };

    return (
        <div>
            {/* Renders links to the "Add Entry" and "Daily Targets" pages respectively. */}
            <div className='buttonDiv'>
                <Link to="/add-entry"><button>Add Entry</button></Link>
                <button onMouseEnter={() => setIsModalOpen(true)} onMouseLeave={() => setIsModalOpen(false)}>Daily Targets</button>
            </div>
            <div>
                {
                    dateTotals.map(day => (
                        <div className='dailyDisplay'>
                            <div className='dateDisplay'><h2>{day.date}</h2></div>
                            <div className={`allInfo ${darkTheme ? 'dark' : 'light'}`}>
                                <div className="infoDisplay">
                                    <div className={`circle ${getClass(day.proteinTotal, 6, 6)}`}><p className="circleText">{day.proteinTotal}</p></div>
                                    <h3 className='roundText'>Protein</h3>
                                </div>
                                <div className="infoDisplay">
                                    <div className={`circle ${getClass(day.veggiesTotal, 4, 6)}`}><p className="circleText">{day.veggiesTotal}</p></div>
                                    <h3 className='roundText'>Vegetables</h3>
                                </div>
                                <div className="infoDisplay">
                                    <div className={`circle ${getClass(day.carbsTotal, 3, 3)}`}><p className="circleText">{day.carbsTotal}</p></div>
                                    <h3 className='roundText'>Carbohydrates</h3>
                                </div>

                                <div className="infoDisplay">
                                    <div className={`circle ${getClass(day.fatsTotal, 3, 3)}`}><p className="circleText">{day.fatsTotal}</p></div>
                                    <h3 className='roundText'>Fats</h3>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modal">
                <div className='modal-content'>
                    <div>
                        <img src={palm} alt=""></img>
                        <img src={fist} alt=""></img>
                        <img src={cuppedHand} alt=""></img>
                        <img src={thumb} alt=""></img>
                        {/* <div>
                            <img src={palm} alt=""></img>
                            <h3>Protein</h3>
                        </div>
                        <div>
                            <img src={fist} alt=""></img>
                            <h3>Veggies</h3>
                        </div>
                        <div>
                            <img src={cuppedHand} alt=""></img>
                            <h3>Carbs</h3>
                        </div>
                        <div>
                            <img src={thumb} alt=""></img>
                            <h3>Fats</h3> */}
                        {/* </div> */}
                    </div>
                    <table className='styled-table'>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Per Day</th>
                                <th>Per Meal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Protein</td>
                                <td>6 Palms</td>
                                <td>1 or 2</td>
                            </tr>
                            <tr>
                                <td>Veggies</td>
                                <td>4 - 6 Fists</td>
                                <td>1 or 2</td>
                            </tr>
                            <tr>
                                <td>Fat</td>
                                <td>3 Thumbs</td>
                                <td>0 or 1</td>
                            </tr>
                            <tr>
                                <td>Carbs</td>
                                <td>3 Cupped Handfuls</td>
                                <td>0 or 1</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Modal >

        </div >
    );
}
