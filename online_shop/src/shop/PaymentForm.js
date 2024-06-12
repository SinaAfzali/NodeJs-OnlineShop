// src/components/PaymentForm.js
import React, { useState } from 'react';
import '../css/PaymentForm.css';

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [randomCode, setRandomCode] = useState('');
  const [userCode, setUserCode] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userCode !== randomCode) {
      setPaymentStatus('Incorrect code. Please try again.');
      return;
    }
    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
      setPaymentStatus('Invalid card number. Please enter a 16-digit number.');
      return;
    }
    if (expiryMonth.length !== 2 || isNaN(expiryMonth) || expiryMonth < 1 || expiryMonth > 12) {
      setPaymentStatus('Invalid expiration month. Please enter a 2-digit number (01-12).');
      return;
    }
    if (expiryYear.length !== 2 || isNaN(expiryYear)) {
      setPaymentStatus('Invalid expiration year. Please enter a 2-digit number.');
      return;
    }
    if (cvv.length !== 4 || isNaN(cvv)) {
      setPaymentStatus('Invalid CVV. Please enter a 4-digit number.');
      return;
    }
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus('Payment Successful');
    }, 1000);
  };

  // Generate a random code for checking not being a robot
  const generateRandomCode = () => {
    const random = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit random code
    const randomCodeString = random.toString();
    setRandomCode(randomCodeString);
    setUserCode('');
  };

  return (
    <div className="payment-form">
      <h2 className="payment-header">Payment Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="form-input"
            required
            maxLength={16}
          />
        </div>
        <div className="form-group expiry-group">
          <div className="expiry-input">
            <label className="form-label">Expiration Month</label>
            <input
              type="text"
              value={expiryMonth}
              onChange={(e) => setExpiryMonth(e.target.value)}
              className="form-input"
              required
              maxLength={2}
            />
          </div>
          <div className="expiry-input">
            <label className="form-label">Expiration Year</label>
            <input
              type="text"
              value={expiryYear}
              onChange={(e) => setExpiryYear(e.target.value)}
              className="form-input"
              required
              maxLength={2}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">CVV2</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            className="form-input"
            required
            maxLength={4}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Random Code</label>
          <div className="random-code">
            <input
              type="text"
              value={randomCode}
              readOnly
              className="form-input random-code-input"
            />
            <button type="button" className="generate-code-btn" onClick={generateRandomCode}>Generate Code</button>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Enter Code</label>
          <input
            type="text"
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            className="form-input"
            required
            maxLength={4}
          />
        </div>
        <button type="submit" className="pay-btn">Pay</button>
      </form>
      {paymentStatus && <p className="payment-status">{paymentStatus}</p>}
    </div>
  );
};

export default PaymentForm;
