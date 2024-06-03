// shop/mainPage.js
import React, { useState, useEffect } from 'react';
import '../css/mainPage.css';
import logoImage from '../images/shopping-cart.png';
import toggleIcon from '../images/toggle-icon.png';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import foodfilter from '../images/food.png';
import clothesfilter from '../images/clothes.png';
import toolsfilter from '../images/tools.png';
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
      } else setIsLoggedIn(false);
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
    navigate('/Cart');
  };

  const handleBottomButtonClick = () => {
    navigate(Router_path.showProduct); // Navigate to showProduct route
  };

  const toggleRightTaskbar = () => {
    setIsRightTaskbarVisible(!isRightTaskbarVisible);
  };

  const sampleProducts = [
    {
      image: require('../images/sample-product.png'),
      name: 'پیراهن مردانه شیک',
      price: '$25.99',
      rating: 4.5,
    },
    {
      image: require('../images/sample-product.png'),
      name: 'کفش ورزشی زنانه',
      price: '$39.99',
      rating: 4.0,
    },
    {
      image: require('../images/sample-product.png'),
      name: 'پیراهن مردانه شیک',
      price: '$25.99',
      rating: 4.5,
    },
    {
      image: require('../images/sample-product.png'),
      name: 'کفش ورزشی زنانه',
      price: '$39.99',
      rating: 4.0,
    },
    // Add more products as needed...
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {Array.from({ length: fullStars }, (_, index) => (
          <span key={`full-${index}`} className="star full">★</span>
        ))}
        {halfStar && <span className="star half">☆</span>}
        {Array.from({ length: emptyStars }, (_, index) => (
          <span key={`empty-${index}`} className="star empty">☆</span>
        ))}
      </>
    );
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
            جستو جو
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
          همه محصولات
        </button>
        <button onClick={() => alert('Top Task 1')}>
          ارزان ترین
        </button>
        <button onClick={() => alert('Top Task 2')}>
          گران ترین
        </button>
        <button onClick={() => alert('Top Task 3')}>
          جدید ترین
        </button>
      </div>

      <div className="product-panel">
        <h2>محصولات</h2>
        <div className="product-list">
          {sampleProducts.map((product, index) => (
            <div key={index} className="product-item">
              <img src={product.image} alt={product.name} className="product-image" />
              <p className="product-name">{product.name}</p>
              <p className="product-price">{product.price}</p>
              <div className="product-rating">{renderStars(product.rating)}</div>
              <button onClick={() => alert(`Add ${product.name} to cart`)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <button className="bottom-left-button" onClick={handleBottomButtonClick}>
        سازندگان
      </button>

      <button className="toggle-right-taskbar" onClick={toggleRightTaskbar}>
        دسته بندی
        <img src={toggleIcon} alt="Toggle" />
      </button>

      <div className={`right-taskbar ${isRightTaskbarVisible ? 'visible' : ''}`}>
        <button onClick={() => alert('Task 1')}>
          همه محصولات
        </button>
        <button onClick={() => alert('Task 1')}>
          <img src={foodfilter} alt="Task 1" /> مواد غذایی
        </button>
        <button onClick={() => alert('Task 2')}>
          <img src={clothesfilter} alt="Task 2" /> مد و پوشاک
        </button>
        <button onClick={() => alert('Task 3')}>
          <img src={toolsfilter} alt="Task 3" /> ابزار آلات
        </button>
        <button onClick={() => alert('Task 4')}>
          <img src={clothesfilter} alt="Task 4" /> آرایشی بهداشتی
        </button>
        <button onClick={() => alert('Task 5')}>
          <img src={clothesfilter} alt="Task 5" /> اسباب بازی
        </button>
        <button onClick={() => alert('Task 6')}>
          <img src={clothesfilter} alt="Task 6" /> کالا های سوپرمارکتی
        </button>
        <button onClick={() => alert('Task 7')}>
          <img src={clothesfilter} alt="Task 7" /> لوازم تحریر
        </button>
        <button onClick={() => alert('Task 8')}>
          <img src={clothesfilter} alt="Task 8" /> موبایل
        </button>
        <button onClick={() => alert('Task 9')}>
          <img src={clothesfilter} alt="Task 9" /> ورزش و سفر
        </button>
        <button onClick={() => alert('Task 10')}>
          <img src={clothesfilter} alt="Task 10" /> تجهیزات پزشکی و سلامت
        </button>
      </div>
    </div>
  );
};

export default MainPage;
