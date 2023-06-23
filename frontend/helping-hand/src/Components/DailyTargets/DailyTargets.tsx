import { Link } from 'react-router-dom';
// import cuppedHand from '../../Assets/cuppedHand.png';
// import fist from '../../Assets/fist.png';
// import palm from '../../Assets/palm.png';
// import thumb from '../../Assets/thumb.png'


export function DailyTargets() {
    return (
        <div>
            {/* <img src={cuppedHand} alt=""></img>
            <img src={fist} alt=""></img>
            <img src={palm} alt=""></img>
            <img src={thumb} alt=""></img> */}
            <table>
                <tr>
                    <th></th>
                    <th>Type</th>
                    <th>Per Day</th>
                    <th>Per Meal</th>
                </tr>
                <tr>
                    {/* <td><img src={palm} alt=""></img></td> */}
                    <td>Protein</td>
                    <td>6 Palms</td>
                    <td>1 or 2</td>
                </tr>
                <tr>
                    {/* <td><img src={fist} alt=""></img></td> */}
                    <td>Veggies</td>
                    <td>4 - 6 Fists</td>
                    <td>1 or 2</td>
                </tr>
                <tr>
                    {/* <td><img src={thumb} alt=""></img></td> */}
                    <td>Fat</td>
                    <td>3 Thumbs</td>
                    <td>0 or 1</td>
                </tr>
                <tr>
                    {/* <td><img src={cuppedHand} alt=""></img></td> */}
                    <td>Carbs</td>
                    <td>3 Cupped Handfuls</td>
                    <td>0 or 1</td>
                </tr>
            </table>
            <Link to={''}>Home</Link>
        </div>
    )
}