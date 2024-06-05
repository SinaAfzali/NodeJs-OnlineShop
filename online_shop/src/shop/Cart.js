import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Cart.css';
import {getCookie, money_standard, update_cart_cookie, update_cookie,checkCharacterOrder} from '../utilities/functions';
const request = require('../utilities/HTTP_REQUEST');
const Url = require('../utilities/urls');

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(()=>{
    let cart_products = [];
    const setProducts = async()=>{
      let cookieValue = getCookie('cart');
      let product = null;
      if(cookieValue && checkCharacterOrder(',', cookieValue)){
        let product_split = cookieValue.split(',');
        for(let i=0;i<product_split.length;i+=2){
          product = await request.Post(Url.getOneProduct_url, {product_id: String(product_split[i])});
          let price = (product.price * (100 - product.discount)) / 100;
          let image = require('../images/productsImage/' + product.image);
          cart_products.push({
            id:product._id,
            name:product.name,
            price:price,
            quantity:product_split[i+1],
            image:image
          });
        }
      }
      if(cart_products.length !== 0 )setCartItems(cart_products);
    }
    setProducts();
  }, []);

  const navigate = useNavigate();

  const handleBottomButtonClick = () => {
    navigate('/');
  };

  const removeFromCart = (id) => {
    let cookieValue = getCookie('cart');
    let product_split = cookieValue.split(',');
    cookieValue = '';
    for(let i=0;i<product_split.length;i+=2){
      if(String(id) !== product_split[i] && i !== product_split.length - 2){
        cookieValue += product_split[i] + ',' + product_split[i+1] + ',';
      }
      else if(String(id) !== product_split[i] && i === product_split.length - 2)cookieValue += product_split[i] + ',' + product_split[i+1];
      if(String(id) === product_split[i] && i === product_split.length - 2 && product_split.length > 2){
        cookieValue = cookieValue.substring(0,cookieValue.length-1);
      }
    }
    update_cookie('cart', cookieValue, 0);
    setCartItems(cartItems.filter(item => item.id !== id));
  };
 
  const incrementQuantity = async(id) => {
    let product1 = await request.Post(Url.getOneProduct_url, {product_id: String(id)});
    let number = update_cart_cookie(String(id), 'plus', Number(product1.productNumber));
    const updatedCartItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: number } : item
    );
    setCartItems(updatedCartItems);
  };

  const decrementQuantity = (id) => {
    let number = update_cart_cookie(String(id), 'minus' , 0);
    const updatedCartItems = cartItems.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: number } : item
    );
    setCartItems(updatedCartItems);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="cart-container">
      <button className="top-left-button" onClick={handleBottomButtonClick}>ادامه خرید</button>
      <div className="cart-panel">
        {cartItems.length === 0 ? (
          <p className="empty-cart-message">سبد خرید شما خالی است.</p>
        ) : (
          <div>
            <ul className="cart-items">
              {cartItems.map(item => (
                <li key={item.id} className="cart-item">
                  <div className="item-info">
                    <img src={item.image} alt={item.name} className="product-image-cart" />
                    <div className="item-details">
                      <span className="item-name">{item.name}</span>
                      <span className="item-price">قیمت: {money_standard(item.price)} تومان  </span>
                      <span className="item-quantity">تعداد: {item.quantity}</span>
                    </div>
                  </div>
                  <div className="item-actions">
                    <button className='quantity-btn' onClick={() => incrementQuantity(item.id)}>+</button>
                    <button className='quantity-btn' onClick={() => decrementQuantity(item.id)}>-</button>
                    <button className='remove-btn' onClick={() => removeFromCart(item.id)}>حذف محصول</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="total-section">
              <span className="total-label">قیمت کل : </span>
              <span className="total-price">{money_standard(calculateTotal())} تومان</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
