import { CarbsCounter } from "../Counters/CarbsCounter";
import { FatsCounter } from "../Counters/FatsCounter";
import { ProteinCounter } from "../Counters/ProteinCounter";
import { VeggieCounter } from "../Counters/VeggieCounter";
// import './DailyEntriesViewer.css'


export function DailyEntriesViewer() {
    return (
        <div>
            <ProteinCounter />
            <VeggieCounter />
            <FatsCounter />
            <CarbsCounter />
            <button>More Info</button>
        </div>
    )
}