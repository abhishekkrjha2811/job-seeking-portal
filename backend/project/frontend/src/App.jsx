import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Application from "./components/Application/Application";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Routes>
          <Route path="/" element={<h1 className="text-3xl font-bold">Welcome to the Job Application Portal</h1>} />
          <Route path="/apply" element={<Application />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;