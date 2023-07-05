import React from 'react';
import Entry from '../../../../../backend/functions/src/models/Entry';
import cuppedHand from '../../Assets/cuppedHand.png';

interface CarbsCounterProps {
  entry: Entry;
  entries: Entry[];
}

export function CarbsCounter(props: CarbsCounterProps) {


  const carbsTotal = props.entries.filter(e => e.carbsType).map(e => e.carbsAmount).reduce((acc, curr) => acc + curr, 0)

  console.log("carbstotal", carbsTotal)

  return (
    <div>
      <img src={cuppedHand} alt="cupped hand" />
      <h3>Carbohydrates</h3>
      <p>{carbsTotal}</p>
    </div>
  );
}
