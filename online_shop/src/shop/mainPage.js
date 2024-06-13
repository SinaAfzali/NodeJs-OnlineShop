import React, { useState, useEffect } from 'react';
import '../css/mainPage.css';
import logoImage from '../images/shopping-cart.png';
import toggleIcon from '../images/toggle-icon.png';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import foodfilter from '../images/food.png';
import clothesfilter from '../images/clothes.png';
import toolsfilter from '../images/tools.png';
import {money_standard, checkCharacterOrder} from '../utilities/functions';
const request = require('../utilities/HTTP_REQUEST');
const Url = require('../utilities/urls');
const Router_path = require('../utilities/routes');

let token;
let result;

let filter1 = 'همه محصولات', filter2 = '';

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

      filter1 = 'همه محصولات';
      filter2 = '';
      let filtered_products = await request.Post(Url.getFilterdProducts_url, {filter1: filter1, filter2: filter2});
      for(let i=0;i<filtered_products.length;i++){
        filtered_products[i].image = require('../images/productsImage/' + filtered_products[i].image);
      }
      setProducts(filtered_products);

    }, 200);

   

  }, []);


  const searchProducts = async()=>{
    filter1 = 'همه محصولات';
    filter2 = '';
    let filtered_products = await request.Post(Url.getFilterdProducts_url, {filter1: filter1, filter2: filter2});
    let searchProducts = [];
    let searchPartStr = searchQuery.split(' ');
    for(let x=0;x<searchPartStr.length;x++) {
      if(searchPartStr[x] === ' ' || searchPartStr[x] === '')continue;
      for(let i=0;i<filtered_products.length;i++){
      if(checkCharacterOrder(searchPartStr[x], filtered_products[i].name)){
        searchProducts.push(filtered_products[i]);
        filtered_products.splice(i,1)
      }
    }
   }
   for(let x=0;x<searchPartStr.length;x++) {
    if(searchPartStr[x] === ' ' || searchPartStr[x] === '' || searchPartStr[x].length < 2)continue;    
   for(let i=0;i<filtered_products.length;i++){
    if(checkCharacterOrder(searchPartStr[x], filtered_products[i].description)){
      searchProducts.push(filtered_products[i]);
      filtered_products.splice(i,1)
    }
  }
}
    for(let i=0;i<searchProducts.length;i++){
      searchProducts[i].image = require('../images/productsImage/' + searchProducts[i].image);
    }
    setProducts(searchProducts);
    document.getElementById('top-taskbar-show-filter1').innerHTML = ' # ' + filter1;
  }



  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLogin = async() => {
    if (!isLoggedIn) {
      navigate(Router_path.loginAndRegister);
    } else{
      let token = Cookies.get('Login');
      let user = await request.Post(Url.tokenValidator, { token: token });
      if(user.role === 'seller')navigate(Router_path.sellerAcount);
      else navigate(Router_path.CustomerAccount);
    }
  };

  const handleLogoClick = () => {
    navigate('/Cart');
  };

  const handleBottomButtonClick = () => {
    navigate(Router_path.CustomerAccount);
  };

  const toggleRightTaskbar = () => {
    setIsRightTaskbarVisible(!isRightTaskbarVisible);
  };


  const setFilter1 = async(category)=>{
    filter1 = category;
    let filtered_products = await request.Post(Url.getFilterdProducts_url, {filter1: filter1, filter2: filter2});
    for(let i=0;i<filtered_products.length;i++){
      filtered_products[i].image = require('../images/productsImage/' + filtered_products[i].image);
    }
    setProducts(filtered_products);
    document.getElementById('top-taskbar-show-filter1').innerHTML = '#' + filter1;
  }

  const setFilter2 = async(filter)=>{
    filter2 = filter;
    let filtered_products = await request.Post(Url.getFilterdProducts_url, {filter1: filter1, filter2: filter2});
    for(let i=0;i<filtered_products.length;i++){
      filtered_products[i].image = require('../images/productsImage/' + filtered_products[i].image);
    }
    setProducts(filtered_products);
    document.getElementById('top-taskbar-show-filter1').innerHTML = ' # ' + filter1;
  }

  const setProducts = (list_products) => {
    let html = '';
   
    for(let i = 0;i< list_products.length;i++){
      let product = list_products[i];
      html += `<div id="product-item${String(product._id)}">
        <img src=${product.image} alt=${product.name} id='image${String(i)}' />
        <p id="product-name${String(i)}">${product.name}</p>
        <div id="product-rating${String(i)}">
        <div id='product-point${String(i)}'></div>
        <div id='product-discount${String(i)}'></div>
      </div>  
        <p id="product-price${String(i)}">${money_standard(((100-product.discount) * product.price / 100).toFixed(0))} تومان </p>           
      </div>`;
    }
   
    
    document.getElementById('product-list').innerHTML = html;

    for(let i=0;i<list_products.length;i++) {
      let product = list_products[i]
      document.getElementById('product-item' + String(product._id)).className = 'product-item';
      document.getElementById('image' + String(i)).className = 'product-image';
      document.getElementById('product-name' + String(i)).className = 'product-name';
      document.getElementById('product-price' + String(i)).className = 'product-price';
      document.getElementById('product-rating' + String(i)).className = 'product-rating';
      document.getElementById('product-point' + String(i)).className = 'product-point';
      document.getElementById('product-discount' + String(i)).className = 'product-discount';
      let score = '';
      if(product.number_scores > 0)score = product.total_scores/product.number_scores;
      if(score !== ''){
        score = score.toFixed(1);
        document.getElementById('product-point' + String(i)).innerHTML = score + '☆';
      }else document.getElementById('product-point' + String(i)).style.backgroundColor = 'white';

      if(product.discount > 0 && product.discount <= 100){
        document.getElementById('product-discount' + String(i)).innerHTML = product.discount + '%';
      }else document.getElementById('product-discount' + String(i)).style.backgroundColor = 'white';

      document.getElementById('product-item' + String(product._id)).addEventListener('click', ()=>{
        // go to product page
        navigate('/showProduct/' + product._id);
      });
    }
  }



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
          <button className="search-icon-main" onClick={searchProducts}>
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
        <label id='top-taskbar-show-filter1' >
          #همه محصولات
        </label>
        <button onClick={() => setFilter2('ارزان ترین')}>
          ارزان ترین
        </button>
        <button onClick={() => setFilter2('گران ترین')}>
          گران ترین
        </button>
        <button onClick={() => setFilter2('جدید ترین')}>
          جدید ترین
        </button>
      </div>

      <div className="product-panel">
        <h2>محصولات</h2>
        <div id='product-list' className="product-list">
         
  



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
        <button onClick={() => setFilter1('همه محصولات')}>
          همه محصولات
        </button>
        <button  onClick={() => setFilter1("مواد غذایی")}>
          <img src={foodfilter} alt="Task 1" /> مواد غذایی
        </button>
        <button onClick={() => setFilter1("مد و پوشاک")}>
          <img src={clothesfilter} alt="Task 2" /> مد و پوشاک
        </button>
        <button onClick={() => setFilter1("ابزار آلات")}>
          <img src={toolsfilter} alt="Task 3" /> ابزار آلات
        </button>
        <button onClick={() => setFilter1("آرایشی بهداشتی")}>
          <img src={clothesfilter} alt="Task 4" /> آرایشی بهداشتی
        </button>
        <button onClick={() => setFilter1("اسباب بازی")}>
          <img src={clothesfilter} alt="Task 5" /> اسباب بازی
        </button>
        <button onClick={() => setFilter1("لوازم تحریر")}>
          <img src={clothesfilter} alt="Task 7" /> لوازم تحریر
        </button>
        <button onClick={() => setFilter1("موبایل")}>
          <img src={clothesfilter} alt="Task 8" /> موبایل
        </button>
        <button onClick={() => setFilter1("ورزش و سفر")}>
          <img src={clothesfilter} alt="Task 9" /> ورزش و سفر
        </button>
        <button onClick={() => setFilter1("پزشکی و سلامت")}>
          <img src={clothesfilter} alt="Task 10" /> پزشکی و سلامت
        </button>
      </div>
    </div>
  );
};

export default MainPage;
