import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Cart.css'; // Import CSS file for styles

const Cart = () => {
  // Sample cart data for demonstration
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: 10, quantity: 2, image: 'food.png' },
    { id: 2, name: 'Product 2', price: 20, quantity: 1, image: 'food.png' },
    { id: 3, name: 'Product 3', price: 15, quantity: 3, image: 'food.png' }
  ]);

  const navigate = useNavigate();

  const handleBottomButtonClick = () => {
    navigate('/'); // Navigate to the root URL
  };

  // Function to remove an item from the cart
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Function to increment quantity of an item
  const incrementQuantity = (id) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  // Function to decrement quantity of an item
  const decrementQuantity = (id) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  // Function to calculate total price of items in the cart
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
                  <div className="item-info">
                    <img src={require(`../images/${item.image}`).default} alt={item.name} className="product-image" />
                    <div>
                      <span className="item-name">{item.name}</span>
                      <span className="item-price">${item.price.toFixed(2)}</span>
                      <div className="quantity-controls">
                        <button className="quantity-btn" onClick={() => decrementQuantity(item.id)}>-</button>
                        <span className="item-quantity">{item.quantity}</span>
                        <button className="quantity-btn" onClick={() => incrementQuantity(item.id)}>+</button>
                      </div>
                    </div>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                </li>
              ))}
            </ul>
            <div className="total-section">
              <span className="total-label">Total:</span>
              <span className="total-price">${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
