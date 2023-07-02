import { CarbsCounter } from "../Counters/CarbsCounter";
import { FatsCounter } from "../Counters/FatsCounter";
import { ProteinCounter } from "../Counters/ProteinCounter";
import { VeggieCounter } from "../Counters/VeggieCounter";
import { FoodEntry } from "../../Interface/FoodEntry";
import { Link } from "react-router-dom";
import { FoodEntries } from "../../Interface/FoodEntry";
import Entry from "../../../../../backend/functions/src/models/Entry";

interface DailyEntriesViewerProps {
  entry: FoodEntry;
}

export function DailyEntriesViewer(props: {entry: Entry}) {
  const { entry } = props;

  return (
    <div>
      <ProteinCounter entry={entry} />
      <VeggieCounter entry={entry} />
      <FatsCounter entry={entry} />
      <CarbsCounter entry={entry} />
      {/* <Link to={`/more-info/${entry.fdcId}`}>
        <button>More Info</button>
      </Link> */}
    </div>
  );
}
