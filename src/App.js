import React from "react";
import "./App.css";
import TopNavigation from "./components/TopNavigation";
import BottomNavigation from "./components/BottomNavigation";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LikesPage from "./pages/LikesPage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import CocktailPage from "./pages/CocktailPage";
import EventPage from "./pages/EventPage";
import SplashPage from "./pages/SplashPage";
import LoginPage from "./pages/LoginPage";
import ArticlesPage from "./pages/ArticlesPage";
import CompetitionPage from "./pages/CompetitionPage";
// import { AnimatePresence, motion } from "framer-motion";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <ScrollToTop />
      <TopNavigation />
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<HomePage />}/>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/likes"element={<LikesPage />}/>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recipe/:id" element={<CocktailPage />} exact={true} />
        <Route path="/events/:id" element={<EventPage />} exact={true} />
        <Route path="/articles/:id" element={<ArticlesPage />} exact={true} />
        <Route path="/competition/:id" element={<CompetitionPage />} exact={true} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/splash" element={<SplashPage />} />
      </Routes>
      <BottomNavigation />
    </div>
  );
}

export default App;
