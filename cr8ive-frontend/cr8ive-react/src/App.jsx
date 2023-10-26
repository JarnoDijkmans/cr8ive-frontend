import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import CreatePostPage from '../src/pages/CreatePostPage';
import './App.css'
import SearchPage from "../src/pages/SearchPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<CreatePostPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
