import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePostPage from '../src/pages/CreatePostPage';
import './App.css';
import LoginPage from "./pages/IndexPage";
import SearchPage from "../src/pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import UserPage from "./pages/UserPage";
import HomePage from "./pages/HomePage"
import NavBar from "./NavBar";
import React from "react";

function App() {
  return (
    <div className="main-wrap">
      <Router>
        <div className='content'>
          <Routes>
              <Route path="/" element={<LoginPage/>} />
              <Route path="/home" element={<><NavBar></NavBar><HomePage/> </>} />
              <Route path="/search" element={<><NavBar></NavBar><SearchPage/> </>} />
              <Route path="/user/:userId" element={<><NavBar></NavBar><ProfilePage/> </>} />
              <Route path="/YourPage" element={<><NavBar></NavBar><UserPage/> </>} />
              <Route path="/AddPost" element={<CreatePostPage/>} />
            </Routes>
        </div>
      </Router>
      <div className="footer"></div>
    </div>
  );
}

export default App;