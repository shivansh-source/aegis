import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WarProvider } from "./context/WarContext";
import { Home } from "./pages/Home";
import { Simulation } from "./pages/Simulation";
import { Results } from "./pages/Results";

// Changed to default export
const App: React.FC = () => (
  <WarProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/simulate" element={<Simulation />} />
        <Route path="/results/:simulationId" element={<Results />} />
      </Routes>
    </Router>
  </WarProvider>
);

export default App;  // Default export