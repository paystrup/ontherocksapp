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
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <ToastContainer theme="dark" autoClose={3000} />
      <AnimatePresence>
        <TopNavigation />
        <Routes key={location.key} location={location}>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
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
                transition={{ duration: 0.4 }}
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
                transition={{ duration: 0.4 }}
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
                transition={{ duration: 0.4 }}
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
                transition={{ duration: 0.4 }}
              >
                <LoginPage />
              </motion.div>
            }
          />
          <Route
            path="/recipe/:id"
            element={
              <motion.div
                initial={{ x: "200vw" }}
                animate={{ x: 0 }}
                transition={{ duration: 0.4 }}
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
                initial={{ x: "200vw" }}
                animate={{ x: 0 }}
                transition={{ duration: 0.4 }}
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
                initial={{ x: "200vw" }}
                animate={{ x: 0 }}
                transition={{ duration: 0.4 }}
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
                initial={{ x: "200vw" }}
                animate={{ x: 0 }}
                transition={{ duration: 0.4 }}
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
      <ScrollToTop />
      <BottomNavigation />
    </div>
  );
}

export default App;
