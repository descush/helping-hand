import React from 'react';
import Entry from '../../../../../backend/functions/src/models/Entry';
import palm from '../../Assets/palm.png';
import { FoodEntry } from '../../Interface/FoodEntry';

interface ProteinCounterProps {
  entry: Entry;
  entries: Entry[];
}

export function ProteinCounter(props: ProteinCounterProps) {
  return (
    <div>
      <img src={palm} alt="palm" />
      <h3>{props.entry.proteinAmount}</h3>
      <p>{props.entry.proteinType}</p>
    </div>
  );
}
