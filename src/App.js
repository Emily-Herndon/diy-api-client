import './App.css';
import Home from './components/pages/Home';
import Blog from './components/pages/Blog';

import {
  BrowserRouter as Router,
  Routes,
  Route
 } from 'react-router-dom'

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route
          path='/'
          element={<Home/>}
          />

          <Route 
          path='/blogs/:id'
          element={<Blog />}
          />
        </Routes>
      </main>
    </Router>
    
  );
}

export default App;
