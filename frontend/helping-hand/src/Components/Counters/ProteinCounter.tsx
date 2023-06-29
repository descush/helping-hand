import Entry from '../../../../../backend/functions/src/models/Entry';
import palm from '../../Assets/palm.png';

export function ProteinCounter(props: {entry: Entry}) {
    return(
        <div>
            <img src={palm} alt=""></img>
            <h3>{props.entry.proteinAmount}</h3>

        </div>
    )
}