import React from 'react';
import Entry from '../../../../../backend/functions/src/models/Entry';
import fist from '../../Assets/fist.png';

interface VeggieCounterProps {
  entry: Entry;
  entries: Entry[];
}



export function VeggieCounter(props: VeggieCounterProps) {

  const veggiesTotal = props.entries.filter(e => e.veggiesType).map(e => e.veggiesAmount).reduce((acc, curr) => acc + curr, 0)


  return (
    <div>
      <img src={fist} alt="fist" />
      <h3>Vegatables</h3>
      <p>{veggiesTotal}</p>
    </div>
  );
}
