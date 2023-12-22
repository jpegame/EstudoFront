// src/App.js
import React from 'react';
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/home';
import Header from './components/header/header';
import Login from './components/login/login';
import PokemonPage from './components/pokemon/pokemon';
import Tournament from './components/tournament/tournament';

const App = () => {
  return (
    <Router>
        <Header />
        <Routes>
          <Route path="/pokemon" element={<PokemonPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/torneio" element={<Tournament />} />
        </Routes>
    </Router>
  );
};

export default App;