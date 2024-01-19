// src/App.js
import React from 'react';
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/home';
import Header from './components/header/header';
import Login from './components/login/login';
import Register from './components/register/register';
import PokemonPage from './components/pokemon/pokemon';
import Tournament from './components/tournament/tournament';
import TournamentWP from './components/tournament/tournamentwp';
import Team from './components/team/team';
import TeamWP from './components/team/teamwp';
import EventStarter from './components/start/start';
import Battle from './components/battle/battle';
import Partida from './components/partidas/partida';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/pokemon" element={<PokemonPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/torneio" element={<Tournament />} />
        <Route path="/torneiowp" element={<TournamentWP />} />
        <Route path="/team" element={<Team />} />
        <Route path="/teamwp" element={<TeamWP />} />
        <Route path="/start" element={<EventStarter />} />
        <Route path="/battle" element={<Battle />} />
        <Route path='/partidas' element={<Partida />} />
      </Routes>
    </Router>
  );
};

export default App;