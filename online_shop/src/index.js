// index.js or App.js (where you set up routing)
import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import MainPage from './shop/mainPage';
import reportWebVitals from './reportWebVitals';
import AddProduct from './product/addProduct';
import PaymentForm from './shop/PaymentForm';
import LoginAndRegister from './user/LoginAndRegister';
import Cart from './shop/Cart';
import Creator from './shop/Creator';
import ProfileView from './user/sellerAccount';
import ShowProduct from './product/showProduct'; // Import the ShowProduct component

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Router_path = require('./utilities/routes');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path={Router_path.root} element={<MainPage />} />
        <Route path={Router_path.loginAndRegister} element={<LoginAndRegister />} />
        <Route path={Router_path.cart} element={<Cart />} />
        <Route path={Router_path.creator} element={<Creator />} />
        <Route path={Router_path.sellerAcount} element={<ProfileView />} />
        <Route path={Router_path.addProduct} element={<AddProduct />} />
        <Route path={Router_path.PaymentForm} element={<PaymentForm />} />
        <Route path={Router_path.showProduct} element={<ShowProduct />} /> {/* Add the ShowProduct route */}
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
