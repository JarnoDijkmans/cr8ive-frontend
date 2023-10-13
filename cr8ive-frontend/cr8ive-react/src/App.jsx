import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import CreatePostPage from '../src/pages/CreatePostPage';
import './App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<CreatePostPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
