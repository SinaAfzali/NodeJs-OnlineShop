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

const Router_path = require('./utilities/routes');


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path={Router_path.root} element={<MainPage />} />
        <Route path={Router_path.loginAndRegister} element={<LoginAndRegister />} />
        <Route path={Router_path.cart} element={<Cart />} /> {/* Add the Cart route */}
        <Route path={Router_path.creator} element={<Creator />} /> {/* Add the Creator route */}
        <Route path={Router_path.sellerAcount} element = {<ProfileView/>} />
        <Route path={Router_path.addProduct} element = {<AddProduct/>} />
      </Routes>
    </Router>
  </React.StrictMode>
);



reportWebVitals();