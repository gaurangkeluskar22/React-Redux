import './App.css';
import HomePage from './pages/HomePage/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatePost from './pages/CreatePost/CreatePost';
import MyPost from './pages/MyPost';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='' element={<HomePage/>}/>
          <Route path='/create' element={<CreatePost/>} />
          <Route path='/myPost' element={<MyPost/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
