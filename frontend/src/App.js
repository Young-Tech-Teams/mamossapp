import React from "react";
import { BrowserRouter as Router } from 'react-router-dom'
import Pages from "./pages/routes";

function App() {
  return (
    <Router className="App">
      <Pages />
    </Router>
  );
}

export default App;