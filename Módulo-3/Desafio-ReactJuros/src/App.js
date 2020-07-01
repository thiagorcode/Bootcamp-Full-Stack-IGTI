import React, { useState } from 'react';
import Calculated from './components/Calculated';
import Income from './components/Income';

export default function App() {
  const [reportSheet, setReportSheet] = useState([])

  const handleCalculated = ({ initialValue, initialTaxe, initialTime }) => {
    let recipeTable = []

    initialValue = parseInt(initialValue, 10);
    initialTaxe = parseFloat(initialTaxe, 10);
    initialTaxe = initialTaxe / 100;

    for (var i = 1; i <= initialTime; i++) {
      let currentRate = (1 + initialTaxe) ** i
      let recipe = initialValue * currentRate;
      let stonks = recipe - initialValue;
      let percetange = (stonks / initialValue) * 100;

      recipeTable.push({
        id: i,
        recipe,
        taxe: initialTaxe,
        stonks,
        initialValue,
        currentPercetange: percetange,
      })
    }
    setReportSheet(recipeTable);
  }

  return (
    <div className="center">
      <h1>React - Juros Compostos</h1>
      <Calculated calculated={handleCalculated} />
      <Income currentValue={reportSheet} />
    </div>
  )
}
