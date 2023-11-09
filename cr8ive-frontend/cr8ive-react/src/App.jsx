import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import CreatePostPage from '../src/pages/CreatePostPage';
import './App.css'
import SearchPage from "../src/pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<CreatePostPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/user/:userId" element={<ProfilePage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
