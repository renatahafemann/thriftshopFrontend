import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../../pages/login';
import Favorites from '../../pages/favorites';
import Home from '../../pages/home';
import Topbar from '../Header/Topbar';
import SignUp from '../Signup/SignUp';
import ProductByCategory from '../Category/Category';
import ProductDetails from '../ProductDetails/productDetails';
import { CookiesProvider, useCookies } from "react-cookie";
import ProductList from '../ProductsList/ProductsList';


function App() {
  const [cookies] = useCookies(["client"]);

  return (
    <CookiesProvider>
    <Router>
      
        <Topbar />
        
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/favorites' element={<Favorites />}/>
          <Route path='/products/:category' element={<ProductByCategory client={cookies.client}/>} />
          <Route path='/products/details/:id' element={<ProductDetails />} />
          <Route path='/products' element={<ProductList client={cookies.client}/>} />
        </Routes>
    </Router>
    </CookiesProvider>
  );
}

export default App;
