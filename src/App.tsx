import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import AllCats from './components/AllCats';
import FavoriteCats from './components/FavoriteCats';
import './styles/main.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="Header_header__pXu37">
          <div className="Header_container__Fb5M1">
            <Navigation />
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<AllCats />} />
            <Route path="/likedCats" element={<FavoriteCats />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 