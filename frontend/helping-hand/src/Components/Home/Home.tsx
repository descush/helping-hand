import { Link } from "react-router-dom";
import Entry from "../../../../../backend/functions/src/models/Entry"
import fist from '../../Assets/fist.png';
import cuppedHand from '../../Assets/cuppedHand.png';
import thumb from '../../Assets/thumb.png';
import palm from '../../Assets/palm.png';
import fromUnixTime from 'date-fns/fromUnixTime'
import './Home.css';
// import CircleType from 'circletype';



interface HomeProps {   // this defines the prop type for the 'Home' component
    entries: Entry[]; // Add entries prop
}

export function Home(props: HomeProps) {
    const { entries } = props;


    let dateSet = [...new Set(props.entries.map((item) => item.date))];
    let dateTotals: { date: any; carbsTotal: number; fatsTotal: number; proteinTotal: number; veggiesTotal: number; }[] = []
    dateSet.forEach(d => {
        dateTotals.push({
            date: fromUnixTime(d / 1000).toLocaleDateString('en-US', {
                timeZone: 'UTC',
                month: 'long',
                day: '2-digit',
                year: 'numeric',
            }),
            carbsTotal: props.entries.filter(e => e.date === d && e.carbsType).map(e => e.carbsAmount).reduce((acc, curr) => acc + curr, 0),
            fatsTotal: props.entries.filter(e => e.date === d && e.fatsType).map(e => e.fatsAmount).reduce((acc, curr) => acc + curr, 0),
            proteinTotal: props.entries.filter(e => e.date === d && e.proteinType).map(e => e.proteinAmount).reduce((acc, curr) => acc + curr, 0),
            veggiesTotal: props.entries.filter(e => e.date === d && e.veggiesType).map(e => e.veggiesAmount).reduce((acc, curr) => acc + curr, 0),
        })
    })

    console.log(dateTotals)

    return (
        <div className='bgLayer'>
            {/* Renders links to the "Add Entry" and "Daily Targets" pages respectively. */}
            <div className='buttonDiv'>
                <Link to="/add-entry"><button>Add Entry</button></Link>
                <Link to="/daily-targets"><button>Daily Targets</button></Link>
            </div>
            <div>
                {
                    dateTotals.map(day => (
                        <div className='dailyDisplay'>
                            <div className='dateDisplay'><h2>{day.date}</h2></div>
                            <div className='allInfo'>
                                <div className="infoDisplay">
                                    <div className='circle'><p>{day.proteinTotal}</p></div>
                                    <h3 className='roundText'>Protein</h3>
                                </div>
                                <div className="infoDisplay">
                                    <div className='circle'><p>{day.veggiesTotal}</p></div>
                                    <h3 className='roundText'>Vegetables</h3>
                                </div>
                                <div className="infoDisplay">
                                    <div className='circle'><p>{day.carbsTotal}</p></div>
                                    <h3 className='roundText'>Carbohydrates</h3>
                                </div>

                                <div className="infoDisplay">
                                    <div className='circle'><p>{day.fatsTotal}</p></div>
                                    <h3 className='roundText'>Fats</h3>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
