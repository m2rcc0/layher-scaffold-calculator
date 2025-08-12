import React, { useState } from "react";
import { calculateScaffold, PartRequirement } from "./calculateScaffold";
import "./App.css";

function App() {
  const [length, setLength] = useState<number | "">(8);
  const [width, setWidth] = useState<number | "">(4);
  const [height, setHeight] = useState<number | "">(6);
  const [result, setResult] = useState<PartRequirement[]>();

  const handleCalculate = () => {
    // Only calculate if all values are numbers
    if (typeof length === 'number' && typeof width === 'number' && typeof height === 'number') {
      setResult(calculateScaffold({ length, width, height }));
    }
  };

  const totalWeight = result?.reduce((sum, req) => sum + (req.part.weight_kg || 0) * req.count, 0) || 0;

  return (
    <div className="App">
      <h1>Layher Scaffold Calculator</h1>
      <p>Calculate the required Layher scaffold components for your project</p>
      
      <div>
        <label>
          Length (m):{" "}
          <input
            type="number"
            value={length}
            min={2}
            step={0.5}
            onChange={e => setLength(e.target.value === "" ? "" : Number(e.target.value))}
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
            onChange={e => setWidth(e.target.value === "" ? "" : Number(e.target.value))}
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
            onChange={e => setHeight(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </label>
      </div>
      <button 
        onClick={handleCalculate}
        disabled={typeof length !== 'number' || typeof width !== 'number' || typeof height !== 'number'}
      >
        Calculate
      </button>
      
      {result && (
        <div className="result">
          <h2>Required Layher Components</h2>
          <div className="parts-list">
            {result.map((req, index) => (
              <div key={index} className="part-item">
                <div className="part-info">
                  <strong>{req.part.name}</strong>
                  <span className="part-number">({req.part.partNumber})</span>
                </div>
                <div className="part-details">
                  <span className="quantity">Qty: {req.count}</span>
                  {req.part.weight_kg && (
                    <span className="weight">
                      Weight: {(req.part.weight_kg * req.count).toFixed(1)} kg
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="summary">
            <strong>Total Weight: {totalWeight.toFixed(1)} kg</strong>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;