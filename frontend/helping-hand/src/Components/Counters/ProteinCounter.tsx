import React from 'react';
import Entry from '../../../../../backend/functions/src/models/Entry';
import palm from '../../Assets/palm.png';
import { FoodEntry } from '../../Interface/FoodEntry';

interface ProteinCounterProps {
  entry: Entry;
  entries: Entry[];
}

export function ProteinCounter(props: ProteinCounterProps) {

  const proteinsTotal = props.entries.filter(e => e.proteinType).map(e => e.proteinAmount).reduce((acc, curr) => acc + curr, 0)

  return (
    <div>
      <img src={palm} alt="palm" />
      <h3>Protein</h3>
      <p>{proteinsTotal}</p>
    </div>
  );
}
