import thumb from '../../Assets/thumb.png'
import Entry from '../../../../../backend/functions/src/models/Entry'

export function FatsCounter(props: {entry: Entry}) {
    return(
        <div>
            <img src={thumb} alt=""></img>
            <h3>{props.entry.fatsAmount}</h3>
        </div>
    )
}