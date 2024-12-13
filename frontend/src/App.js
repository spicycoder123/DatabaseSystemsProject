import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext'; // Import UserProvider

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SwapsPage from './pages/SwapsPage';
import RatingsPage from './pages/RatingsPage';
import RecommendationsPage from './pages/RecommendationsPage';
import NavBar from './components/Header'; // Import NavBar with LogoutButton
import Banner from './components/Banner'; // Import Banner.js
import BookPage from './pages/BookPage'; // Import BookPage.js (display all books)
import RegisterPage from './pages/RegisterPage'; // Import RegisterPage.js

function App() {
  return (
    <UserProvider>
      <Router>
        {/* Include the NavBar component with LogoutButton */}
        <NavBar />

        {/* Include the Banner component above the Routes to ensure it shows on all pages */}
        <Banner />

        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/swaps" element={<SwapsPage />} />
          <Route path="/ratings" element={<RatingsPage />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />

          {/* Routes for books and register */}
          <Route path="/books" element={<BookPage />} /> {/* Route for displaying all books */}
          <Route path="/register" element={<RegisterPage />} /> {/* Route for register */}
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
