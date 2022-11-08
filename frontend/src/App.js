import React from "react";
import { BrowserRouter as Router } from 'react-router-dom'
import Home from "./pages/routes";

function App() {
  return (
    <Router className="App">
      <Home />
    </Router>
  );
}

export default App;