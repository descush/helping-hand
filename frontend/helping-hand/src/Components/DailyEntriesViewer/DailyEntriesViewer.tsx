import { CarbsCounter } from "../Counters/CarbsCounter";
import { FatsCounter } from "../Counters/FatsCounter";
import { ProteinCounter } from "../Counters/ProteinCounter";
import { VeggieCounter } from "../Counters/VeggieCounter";
import Entry from "../../../../../backend/functions/src/models/Entry";
// import './DailyEntriesViewer.css'


export function DailyEntriesViewer(props: {entry: Entry}) {
    return (
        <div>
            <ProteinCounter entry={props.entry} />
            <VeggieCounter entry={props.entry} />
            <FatsCounter entry={props.entry} />
            <CarbsCounter entry={props.entry} />
            <button>More Info</button>
        </div>
    )
}