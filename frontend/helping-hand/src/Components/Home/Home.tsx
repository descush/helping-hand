import { Link } from "react-router-dom";
import { useContext } from "react";
import FoodContext from "../../Context/FoodContext";

export function Home() {
    const {
        dailyProteinSubmissions,
        dailyVeggieSubmissions,
        dailyCarbSubmissions,
        dailyFatSubmissions
    } = useContext(FoodContext);

    return (
        <div>
            {/* Renders links to the "Add Entry" and "Daily Targets" pages respectively. */}
            <Link to="/add-entry">
                <button>Add Entry</button>
            </Link>
            <Link to="/daily-targets">
                <button>Daily Targets</button>
            </Link>
            <div>
                <h3>Daily Protein Submissions:</h3>
                {Object.entries(dailyProteinSubmissions).map(([date, count]) => (
                    <div key={date}>
                        <p>Date: {date}</p>
                        <p>Submissions: {count}</p>
                    </div>
                ))}
            </div>
            <div>
                <h3>Daily Veggie Submissions:</h3>
                {Object.entries(dailyVeggieSubmissions).map(([date, count]) => (
                    <div key={date}>
                        <p>Date: {date}</p>
                        <p>Submissions: {count}</p>
                    </div>
                ))}
            </div>
            <div>
                <h3>Daily Carb Submissions:</h3>
                {Object.entries(dailyCarbSubmissions).map(([date, count]) => (
                    <div key={date}>
                        <p>Date: {date}</p>
                        <p>Submissions: {count}</p>
                    </div>
                ))}
            </div>
            <div>
                <h3>Daily Fat Submissions:</h3>
                {Object.entries(dailyFatSubmissions).map(([date, count]) => (
                    <div key={date}>
                        <p>Date: {date}</p>
                        <p>Submissions: {count}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}