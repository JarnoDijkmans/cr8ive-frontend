import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePostPage from '../src/pages/CreatePostPage';
import { useState } from "react";
import './App.css';
import LoginPage from "../src/pages/LoginPage";
import SearchPage from "../src/pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import UserPage from "./pages/UserPage";
import NavBar from "./NavBar";
import React from "react";
import PrivateRoute from "./PrivateRoute"; 

function App() {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    const accessToken = localStorage.getItem('accessToken');
    return !!accessToken;
  });
  
  return (
    <div className="main-wrap">
      <Router>
        <div className='content'>
          <Routes>
            <Route path="/" element={<LoginPage isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />} />
            <Route path="/search" element={<PrivateRoute value={isLoggedIn}><NavBar /><SearchPage /></PrivateRoute>} />
            <Route path="/user/:userId" element={<PrivateRoute value={isLoggedIn}><NavBar /><ProfilePage /></PrivateRoute>} />
            <Route path="/YourPage" element={<PrivateRoute value={isLoggedIn}><NavBar /><UserPage/></PrivateRoute>} />
          </Routes>
        </div>
      </Router>
      <div className="footer"></div>
    </div>
  );
}

export default App;