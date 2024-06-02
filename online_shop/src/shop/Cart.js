import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Cart.css';
const {money_standard} = require('../utilities/functions');

const Cart = () => {
  // Sample cart data for demonstration
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: 100000, quantity: 2 },
    { id: 2, name: 'Product 2', price: 200000, quantity: 1 },
    { id: 3, name: 'Product 3', price: 150000, quantity: 3 }
  ]);

  const navigate = useNavigate();

  const handleBottomButtonClick = () => {
    navigate('/'); // Navigate to the root URL
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
          <p className="empty-cart-message">Your cart is empty.</p>
        ) : (
          <div>
            <ul className="cart-items">
              {cartItems.map(item => (
                <li key={item.id} className="cart-item">
                  <div>
                    <span>{item.name}</span>
                    <span>{item.price}</span>
                    <span>Quantity: {item.quantity}</span>
                  </div>
                  <div>
                    <button className='quantity-btn' onClick={() => incrementQuantity(item.id)}>+</button>
                    <button className='quantity-btn' onClick={() => decrementQuantity(item.id)}>-</button>
                    <button className='remove-btn' onClick={() => removeFromCart(item.id)}>حذف محصول</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="total-section">
              <span className="total-label">قیمت کل : </span>
              <span className="total-price">تومان {money_standard(calculateTotal())}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
