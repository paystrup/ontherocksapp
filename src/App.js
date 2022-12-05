import React from 'react';
import './App.css';
import TopNavigation from './components/TopNavigation';
import BottomNavigation from './components/BottomNavigation';
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/HomePage';
import LikesPage from './pages/LikesPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import CocktailPage from './pages/CocktailPage';

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <TopNavigation />
      <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/likes" element={<LikesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/recipe/:id" element={<CocktailPage />} exact={true} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      <BottomNavigation />
    </div>
  );
}

export default App;
