import React from 'react';
import Entry from '../../../../../backend/functions/src/models/Entry';
import fist from '../../Assets/fist.png';

interface VeggieCounterProps {
  entry: Entry;
}

export function VeggieCounter(props: VeggieCounterProps) {
  return (
    <div>
      <img src={fist} alt="fist" />
      <h3>{props.entry.veggiesAmount}</h3>
      <p>{props.entry.veggiesType}</p>
    </div>
  );
}
