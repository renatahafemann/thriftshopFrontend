import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../../pages/login';
import Favorites from '../../pages/favorites';
import Home from '../../pages/home';
import Topbar from '../Header/Topbar';


function App() {
  return (
    <Router>
      
        <Topbar />
        
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/favorites' element={<Favorites />}/>
        </Routes>
    </Router>
  );
}

export default App;
