import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import Home from './Components/Home';
import './App.css'
import Challenge from './Components/Programmes/Challenge';
import ParticipateModal from './Components/assets/Challenges/ParticipateModal';
import Admin from './Components/Programmes/Admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/challenge/dates" element={<Challenge/>} >
          <Route path=':id' element={<ParticipateModal/>} />
        </Route>
        <Route path="/challenge/Admin" element={<Admin/>} >
          <Route path=':id' element={<ParticipateModal/>} />
        </Route>
        <Route path="/signin" element={<Signin/>} />
      </Routes>
    </Router>
  );
}

export default App;
