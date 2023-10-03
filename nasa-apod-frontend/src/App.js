import React from "react";
import "./App.css";
import APODComponent from "./components/APODComponent";
import DonkiComponent from "./components/DonkiComponent";
import NeoWsData from "./components/NeoWsData";
function App() {
  return (
    <div className="App">
      <APODComponent />

      <h1>NASA Space Weather Data</h1>

      <DonkiComponent />
      <h1>NASA NeoWs Data</h1>
      <NeoWsData />
    </div>
  );
}

export default App;
