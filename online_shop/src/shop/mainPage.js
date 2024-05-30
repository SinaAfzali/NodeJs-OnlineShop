import React, { useState, useEffect } from 'react';
import '../css/mainPage.css';
import logoImage from '../images/shopping-cart.png';
import taskIcon1 from '../images/shopping-cart.png'; // Example icon for Task 1
import taskIcon2 from '../images/shopping-cart.png'; // Example icon for Task 2
import taskIcon3 from '../images/food.png'; // Example icon for Task 3
import toggleIcon from '../images/toggle-icon.png'; // Replace with your image path
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const request = require('../utilities/HTTP_REQUEST');
const Url = require('../utilities/urls');
const Router_path = require('../utilities/routes');




let token;
let result;


const MainPage = () => {
  

  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [isRightTaskbarVisible, setIsRightTaskbarVisible] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      token = Cookies.get('Login');
      result = await request.Post(Url.tokenValidator, { token: token });
      if (result) {
        setIsLoggedIn(true);
      }else setIsLoggedIn(false);
    };

    setTimeout(async () => {
      await validateToken();
      const roleUserElement = document.getElementById('roleuser');
      if (roleUserElement) {
        roleUserElement.style = 'font-size:12px;color:red';
      }
    }, 200);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLogin = () => {
    if (!isLoggedIn) {
      navigate(Router_path.loginAndRegister);
    } else {
      navigate(Router_path.sellerAcount);
    }
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

  const toggleRightTaskbar = () => {
    setIsRightTaskbarVisible(!isRightTaskbarVisible);
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
            <button id='loginuser' onClick={handleLogin}>
            <pre>{result.userName}</pre>
            <p id='roleuser'>{result.role}</p>
          </button>
          ) : (
            <button onClick={handleLogin}>ورود به حساب / عضویت</button>
          )}
        </div>
      </div>
      
      <div className="top-taskbar">
        <button onClick={() => alert('Top Task 1')}>
          <img src={taskIcon1} alt="Top Task 1" /> Top Task 1
        </button>
        <button onClick={() => alert('Top Task 2')}>
          <img src={taskIcon2} alt="Top Task 2" /> Top Task 2
        </button>
        <button onClick={() => alert('Top Task 3')}>
          <img src={taskIcon3} alt="Top Task 3" /> Top Task 3
        </button>
      </div>

      <button className="bottom-left-button" onClick={handleBottomButtonClick}>
        سازندگان
      </button>
      <button className="bottom-right-button" onClick={handleNewButtonClick}>
        New Button
      </button>
      <button className="toggle-right-taskbar" onClick={toggleRightTaskbar}>
        <img src={toggleIcon} alt="Toggle" />
      </button>

      {isRightTaskbarVisible && (
        <div className="right-taskbar">
          <button onClick={() => alert('Task 1')}>
            <img src={taskIcon1} alt="Task 1" /> مد و پوشاک
          </button>
          <button onClick={() => alert('Task 1')}>
            <img src={taskIcon1} alt="Task 1" /> آرایشی بهداشتی
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
            <img src={taskIcon3} alt="Task 3" /> مواد غذایی
          </button>
          <button onClick={() => alert('Task 3')}>
            <img src={taskIcon3} alt="Task 3" /> کالای دیجیتال
          </button>
          <button onClick={() => alert('Task 3')}>
            <img src={taskIcon3} alt="Task 3" /> ورزش و سفر
          </button>
        </div>
      )}
    </div>
  );
};

export default MainPage;
