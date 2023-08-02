import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../../pages/login';
import Favorites from '../../pages/favorites';
import Home from '../../pages/home';
import Topbar from '../Header/Topbar';
import ProductByCategory from '../Category/Category';
import ProductDetails from '../ProductDetails/productDetails';



function App() {
  return (
    <Router>
      
        <Topbar />
        
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/favorites' element={<Favorites />}/>
          <Route path='/products/:category' element={<ProductByCategory />} />
          <Route path='/products/details/:id' element={<ProductDetails />} />
        </Routes>
    </Router>
  );
}

export default App;
