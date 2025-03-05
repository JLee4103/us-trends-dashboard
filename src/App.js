// src/App.js
import React from 'react';
import TrendsChart from './TrendsChart';

function App() {
  return (
    <div className="App">
      <header>
        <h1>US Trending Topics Dashboard</h1>
      </header>
      <main>
        <TrendsChart />
      </main>
    </div>
  );
}

export default App;
