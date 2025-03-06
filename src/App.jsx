import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Upload from './components/Upload';
import Watch from './components/Watch';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/upload" className="nav-link">Upload</Link>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/signup" className="nav-link">Signup</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/watch/:videoId" element={<Watch />} />
      </Routes>
    </div>
  );
}

export default App;
