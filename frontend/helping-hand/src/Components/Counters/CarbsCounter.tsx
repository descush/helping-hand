import React from 'react';
import Entry from '../../../../../backend/functions/src/models/Entry';
import cuppedHand from '../../Assets/cuppedHand.png';

interface CarbsCounterProps {
  entry: Entry;
}

export function CarbsCounter(props: CarbsCounterProps) {
  return (
    <div>
      <img src={cuppedHand} alt="cupped hand" />
      <h3>{props.entry.carbsAmount}</h3>
      <p>{props.entry.carbsType}</p>
    </div>
  );
}
