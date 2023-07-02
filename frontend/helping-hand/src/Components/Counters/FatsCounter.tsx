import React from 'react';
import Entry from '../../../../../backend/functions/src/models/Entry';
import thumb from '../../Assets/thumb.png';

interface FatsCounterProps {
  entry: Entry;
}

export function FatsCounter(props: FatsCounterProps) {
  return (
    <div>
      <img src={thumb} alt="thumb" />
      <h3>{props.entry.fatsAmount}</h3>
      <p>{props.entry.fatsType}</p>
    </div>
  );
}
