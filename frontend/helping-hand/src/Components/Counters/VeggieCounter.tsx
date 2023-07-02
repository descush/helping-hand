import Entry from '../../../../../backend/functions/src/models/Entry';
import fist from '../../Assets/fist.png';

export function VeggieCounter(props: {entry: Entry}) {
    return(
        <div>
            <img src={fist} alt=""></img>
            <h3>{props.entry.veggiesAmount}</h3>
        </div>
    )
}