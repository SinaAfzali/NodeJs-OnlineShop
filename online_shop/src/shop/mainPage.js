import React, { useState, useEffect } from 'react';
import '../css/mainPage.css';
import logoImage from '../images/shopping-cart.png';
import toggleIcon from '../images/toggle-icon.png'; // Replace with your image path
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import filter1 from '../images/food.png'
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
    navigate('/Cart'); // Navigate to the cart page
  };

  const handleBottomButtonClick = () => {
    navigate('/sellerAccount'); // Navigate to the Creator page
  };

  const toggleRightTaskbar = () => {
    setIsRightTaskbarVisible(!isRightTaskbarVisible);
  };

  const sampleProducts = [
    {
      image: '../images/sample-product.png',
      name: 'پیراهن مردانه شیک',
      price: '$25.99',
    },
    {
      image: '../images/product2.png',
      name: 'کفش ورزشی زنانه',
      price: '$39.99',
    },
    {
      image: '../images/product3.png',
      name: 'لپ تاپ گیمینگ',
      price: '$999.99',
    },
    {
      image: '../images/product4.png',
      name: 'ساعت هوشمند',
      price: '$149.99',
    },
    {
      image: '../images/product5.png',
      name: 'کتابخانه چوبی',
      price: '$199.99',
    },
    {
      image: '../images/product6.png',
      name: 'دوربین عکاسی DSLR',
      price: '$799.99',
    }
  ];

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
        <img src={toggleIcon} alt="Toggle" />
      </button>

      <div className={`right-taskbar ${isRightTaskbarVisible ? 'visible' : ''}`}>
        <button onClick={() => alert('Task 1')}>
          <img src={filter1} alt="Task 1" /> مد و پوشاک
        </button>
        <button onClick={() => alert('Task 1')}>
          <img src="../images/shopping-cart.png" alt="Task 1" /> آرایشی بهداشتی
        </button>
        <button onClick={() => alert('Task 1')}>
          <img src="../images/shopping-cart.png" alt="Task 1" /> ابزار آلات
        </button>
        <button onClick={() => alert('Task 1')}>
          <img src="../images/shopping-cart.png" alt="Task 1" /> لوازم خانگی
        </button>
        <button onClick={() => alert('Task 2')}>
          <img src="online_shop\src\images\shopping-cart.png" alt="Task 2" /> لوازم التحریر
        </button>
        <button onClick={() => alert('Task 3')}>
          <img src="../images/food.png" alt="Task 3" /> مواد غذایی
        </button>
        <button onClick={() => alert('Task 3')}>
          <img src="../images/food.png" alt="Task 3" /> کالای دیجیتال
        </button>
        <button onClick={() => alert('Task 3')}>
          <img src="../images/food.png" alt="Task 3" /> ورزش و سفر
        </button>
      </div>
    </div>
  );
};

export default MainPage;
