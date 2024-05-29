import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import MainPage from './shop/mainPage'
import reportWebVitals from './reportWebVitals';
import AddProduct from './product/addProduct';
import LoginAndRegister from './user/LoginAndRegister';
import Cart from './shop/Cart'; // Import the Cart component
import Creator from './shop/Creator'; // Import the Creator component
import ProfileView from './user/sellerAccount';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/loginAndRegister" element={<LoginAndRegister />} />
        <Route path="/cart" element={<Cart />} /> {/* Add the Cart route */}
        <Route path="/creator" element={<Creator />} /> {/* Add the Creator route */}
        <Route path="/sellerAccount" element = {<ProfileView/>} />
        <Route path="/addProduct" element = {<AddProduct/>} />
      </Routes>
    </Router>
  </React.StrictMode>
);



reportWebVitals();