import React, { useState } from "react";
import "./App.css";

const LAYHER_STANDARD_LENGTH = 2.0; // meters

function calculateMaterials(length: number, width: number, height: number) {
  // Simple estimation logic for demo purposes
  const bays = Math.ceil(length / LAYHER_STANDARD_LENGTH);
  const rows = Math.ceil(width / LAYHER_STANDARD_LENGTH);
  const lifts = Math.ceil(height / 2); // assuming 2m lift height

  const standards = (bays + 1) * (rows + 1) * lifts;
  const ledgers = bays * (rows + 1) * (lifts + 1);
  const transoms = (rows + 1) * (bays + 1) * lifts;

  return {
    standards,
    ledgers,
    transoms,
    lifts
  };
}

function App() {
  const [length, setLength] = useState(8);
  const [width, setWidth] = useState(4);
  const [height, setHeight] = useState(6);
  const [result, setResult] = useState<ReturnType<typeof calculateMaterials>>();

  const handleCalculate = () => {
    setResult(calculateMaterials(length, width, height));
  };

  return (
    <div className="App">
      <h1>Layher Scaffold Calculator</h1>
      <div>
        <label>
          Length (m):{" "}
          <input
            type="number"
            value={length}
            min={2}
            step={0.5}
            onChange={e => setLength(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Width (m):{" "}
          <input
            type="number"
            value={width}
            min={2}
            step={0.5}
            onChange={e => setWidth(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Height (m):{" "}
          <input
            type="number"
            value={height}
            min={2}
            step={0.5}
            onChange={e => setHeight(Number(e.target.value))}
          />
        </label>
      </div>
      <button onClick={handleCalculate}>Calculate</button>
      {result && (
        <div className="result">
          <h2>Estimated Materials</h2>
          <ul>
            <li>Standards: {result.standards}</li>
            <li>Ledgers: {result.ledgers}</li>
            <li>Transoms: {result.transoms}</li>
            <li>Lifts: {result.lifts}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;