import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Cart.css';
import product1Image from '../images/sample-product.png';
import product2Image from '../images/sample-product.png';
import product3Image from '../images/sample-product.png';
import product4Image from '../images/sample-product.png';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: 100000, quantity: 2, image: product1Image },
    { id: 2, name: 'Product 2', price: 200000, quantity: 1, image: product2Image },
    { id: 3, name: 'Product 3', price: 150000, quantity: 3, image: product3Image },
    { id: 4, name: 'Product 4', price: 120000, quantity: 2, image: product4Image }
  ]);

  const navigate = useNavigate();

  const handleBottomButtonClick = () => {
    navigate('/');
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const incrementQuantity = (id) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  const decrementQuantity = (id) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
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
                      <span className="item-price">قیمت: {item.price} تومان</span>
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
              <span className="total-price">{calculateTotal()} تومان</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
