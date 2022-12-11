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
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <ScrollToTop />

      {/* 🚨 EXIT BEFORE ENTER CREATES A CONSOLE ERROR */}
      <AnimatePresence exitBeforeEnter>
        <TopNavigation />
        <Routes key={location.pathname} location={location}>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <HomePage />
              </motion.div>
            }
          />
          <Route
            path="/search"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <SearchPage />
              </motion.div>
            }
          />
          <Route
            path="/likes"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <LikesPage />
              </motion.div>
            }
          />
          <Route
            path="/profile"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <ProfilePage />
              </motion.div>
            }
          />
          <Route
            path="/login"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <LoginPage />
              </motion.div>
            }
          />
          <Route
            path="/recipe/:id"
            element={
              <motion.div
                initial={{ x: "200vw", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CocktailPage />
              </motion.div>
            }
            exact={true}
          />
          <Route
            path="/events/:id"
            element={
              <motion.div
                initial={{ x: "200vw", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <EventPage />
              </motion.div>
            }
            exact={true}
          />
          <Route
            path="/articles/:id"
            element={
              <motion.div
                initial={{ x: "200vw", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArticlesPage />
              </motion.div>
            }
            exact={true}
          />
          <Route
            path="/competition/:id"
            element={
              <motion.div
                initial={{ x: "200vw", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CompetitionPage />
              </motion.div>
            }
            exact={true}
          />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/splash" element={<SplashPage />} />
        </Routes>
      </AnimatePresence>
      <BottomNavigation />
    </div>
  );
}

export default App;
