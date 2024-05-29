import React, { useState } from 'react';
import './css/mainPage.css'; 
import logoImage from '../images/shopping-cart.png';
import taskIcon1 from '../images/shopping-cart.png'; // Example icon for Task 1
import taskIcon2 from '../images/shopping-cart.png'; // Example icon for Task 2
// import taskIcon3 from '../images/food.png'; // Example icon for Task 3
import { useNavigate } from 'react-router-dom';



const MainPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Assuming the user is not logged in initially
  const navigate = useNavigate(); // React Router hook for navigation

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
    navigate('/loginAndRegister'); // Navigate to the login page
  };

  const handleLogoClick = () => {
    navigate('/Cart'); // Navigate to the cart page
  };

  const handleBottomButtonClick = () => {
    navigate('/creator'); // Navigate to the Creator page
  };

  const handleNewButtonClick = () => {
    navigate('/addProduct'); // Navigate to the new page
  };

  return (
    <div className="main-page">
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
      <button className="bottom-left-button" onClick={handleBottomButtonClick}>
        سازندگان
      </button>
      <button className="bottom-right-button" onClick={handleNewButtonClick}>
        New Button
      </button>
      <div className="right-taskbar">
        <button onClick={() => alert('Task 1')}>
          <img src={taskIcon1} alt="Task 1" /> Task 1
        </button>
        <button onClick={() => alert('Task 1')}>
          <img src={taskIcon1} alt="Task 1" /> Task 1
        </button>
        <button onClick={() => alert('Task 1')}>
          <img src={taskIcon1} alt="Task 1" /> Task 1
        </button>
        <button onClick={() => alert('Task 1')}>
          <img src={taskIcon1} alt="Task 1" /> Task 1
        </button>
        <button onClick={() => alert('Task 1')}>
          <img src={taskIcon1} alt="Task 1" /> Task 1
        </button>
        <button onClick={() => alert('Task 1')}>
          <img src={taskIcon1} alt="Task 1" /> ابزار آلات
        </button>
        <button onClick={() => alert('Task 1')}>
          <img src={taskIcon1} alt="Task 1" /> لوازم خانگی
        </button>
        
        <button onClick={() => alert('Task 2')}>
          <img src={taskIcon2} alt="Task 2" /> لوازم التحریر
        </button>
        <button onClick={() => alert('Task 3')}>
          <img src={taskIcon1} alt="Task 3" /> مواد غذایی
        </button>
      </div>
    </div>
  );
};

export default MainPage;
