import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import FoodContext from "../../Context/FoodContext";

export function Home() {
    const {
        foodEntry,
        dailyProteinSubmissions,
        dailyVeggieSubmissions,
        dailyCarbSubmissions,
        dailyFatSubmissions,
        setDailyProteinSubmissions,
        setDailyCarbSubmissions,
        setDailyVeggieSubmissions,
        setDailyFatSubmissions
    } = useContext(FoodContext);


    const calculateDailySubmissions = () => {
        const currentDate = new Date().toLocaleDateString();

        // // Reset the daily submissions counts
        // setDailyProteinSubmissions({});
        // setDailyVeggieSubmissions({});
        // setDailyCarbSubmissions({});
        // setDailyFatSubmissions({});

        foodEntry.forEach((entry) => {
            if (entry.timestamp) {
                const entryDate = entry.timestamp.toLocaleDateString();

                // Update the daily submissions counts for each category
                if (entryDate === currentDate) {
                    setDailyProteinSubmissions((prevSubmissions) => ({
                        ...prevSubmissions,
                        [entryDate]: (prevSubmissions[entryDate] || 0) + 1
                    }));

                    setDailyVeggieSubmissions((prevSubmissions) => ({
                        ...prevSubmissions,
                        [entryDate]: (prevSubmissions[entryDate] || 0) + 1
                    }));

                    setDailyCarbSubmissions((prevSubmissions) => ({
                        ...prevSubmissions,
                        [entryDate]: (prevSubmissions[entryDate] || 0) + 1
                    }));

                    setDailyFatSubmissions((prevSubmissions) => ({
                        ...prevSubmissions,
                        [entryDate]: (prevSubmissions[entryDate] || 0) + 1
                    }));
                }
            }
        });
    };

    useEffect(() => {
        calculateDailySubmissions();
        console.log('is working')
    }, [foodEntry]);

    console.log(`carbs: ${dailyCarbSubmissions.toString()}`)
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