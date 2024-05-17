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
      </Routes>
    </Router>
  </React.StrictMode>
);

// setTimeout(() => {
//   const registerForm = document.getElementById('register_form');
// registerForm.addEventListener("submit", post, false);
// }, 2000);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
