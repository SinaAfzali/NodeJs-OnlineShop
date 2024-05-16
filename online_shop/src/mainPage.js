import React, { useState } from 'react';
import './css/mainPage.css'; 
import logoImage from './images/shopping-cart.png';

const MainPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Assuming the user is not logged in initially

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLogin = () => {
     setIsLoggedIn(!isLoggedIn);
  };

  const handleLogoClick = () => {
    // Handle click on logo
    // You can add your logic here, for example, redirect to home page
    console.log("Logo clicked");
  };

  return (
    <div className="header">
      <button className="logo" onClick={handleLogoClick}>
        <img src={logoImage} alt="Your Logo" />
      </button>
      <div className="search-box">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="... چی لازم داری"
        />
        <button className="search-icon" onClick={() => alert(`Search for: ${searchQuery}`)}>
          جست و جو
        </button>
      </div>
      <div className="login-options">
        {isLoggedIn ? (
          <button onClick={handleLogin}>Logout</button>
        ) : (
          <button onClick={handleLogin}>ورود به حساب / عضویت</button>
        )}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      
    </div>
  );
};

export default MainPage;