import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import MainPage from './mainPage'
import reportWebVitals from './reportWebVitals';
import AddProduct from './addProduct';
import LoginAndRegister from './LoginAndRegister';
import Cart from './Cart'; // Import the Cart component
import Creator from './Creator'; // Import the Creator component
import ProfileView from './sellerAccount';


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