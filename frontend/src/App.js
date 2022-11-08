import React from "react";
import { BrowserRouter as Router } from 'react-router-dom'
import Home from "./pages/Routes";

function App() {
  return (
    <Router className="App">
      <Home />
    </Router>
  );
}

export default App;