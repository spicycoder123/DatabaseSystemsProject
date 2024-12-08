import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookPage from './pages/BookPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import SwapsPage from './pages/SwapsPage';
import RatingsPage from './pages/RatingsPage';
import RecommendationsPage from './pages/RecommendationsPage';
import Banner from './components/Banner';

function App() {
  return (
    <Router>
      <Banner /> {/* This banner will be shown on all pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book/:id" element={<BookPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/swaps" element={<SwapsPage />} />
        <Route path="/ratings" element={<RatingsPage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
