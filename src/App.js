import React from 'react';
import './App.css';
import TopNavigation from './components/TopNavigation';
import BottomNavigation from './components/BottomNavigation';
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <TopNavigation />
      <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      <BottomNavigation />
    </div>
  );
}

export default App;
