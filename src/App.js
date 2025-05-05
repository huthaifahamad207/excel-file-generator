import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ReviewPage from "./screens/ReviewPage";
import HomePage from "./screens/HomePage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/review" element={<ReviewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
