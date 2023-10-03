import React from "react";
import "./App.css";
import APODComponent from "./components/APODComponent";
import DonkiComponent from "./components/DonkiComponent";
import NeoWsData from "./components/NeoWsData";
import EonetEvents from "./components/EonetEvents";
import EPICComponent from "./components/Epic";
function App() {
  return (
    <div className="App">
      <h1>🌌Astronomy Picture of the Day 🌌</h1>
      <APODComponent />

      <h1>🌌🛰️NASA Space Weather Data🛰️🌌</h1>
      <DonkiComponent />

      <h1>☄️NASA's Registered Asteroids Near Earth☄️</h1>
      <NeoWsData />

      <h1>Welcome to the NASA EPIC Image Viewer🛰️👩‍🚀</h1>
      <EPICComponent />

      <EonetEvents />
    </div>
  );
}

export default App;
