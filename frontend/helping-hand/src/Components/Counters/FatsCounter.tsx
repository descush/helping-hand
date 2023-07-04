import React from 'react';
import Entry from '../../../../../backend/functions/src/models/Entry';
import thumb from '../../Assets/thumb.png';

interface FatsCounterProps {
  entry: Entry;
  entries: Entry[];
}

export function FatsCounter(props: FatsCounterProps) {

  const fatsTotal = props.entries.filter(e => e.fatsType).map(e => e.fatsAmount).reduce((acc, curr) => acc + curr, 0)


  return (
    <div>
      <img src={thumb} alt="thumb" />
      <h3>Fats</h3>
      <p>{fatsTotal}</p>
    </div>
  );
}
