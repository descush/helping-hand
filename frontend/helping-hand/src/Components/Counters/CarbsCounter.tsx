import Entry from '../../../../../backend/functions/src/models/Entry';
import cuppedHand from '../../Assets/cuppedHand.png';

export function CarbsCounter(props: { entry: Entry}) {
    return(
        <div>
             <img src={cuppedHand} alt=""></img>
             <h3>{props.entry.carbsAmount}</h3>
        </div>
    )
}