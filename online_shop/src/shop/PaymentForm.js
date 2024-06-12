// src/components/PaymentForm.js
import React, { useState , useEffect} from 'react';
import '../css/PaymentForm.css';
import { money_standard } from '../utilities/functions';
import { useNavigate, useParams } from 'react-router-dom';
import Router_path from '../utilities/routes';
import Cookies from 'js-cookie';
const request = require('../utilities/HTTP_REQUEST');
const Url = require('../utilities/urls');

let last_val = '';

const PaymentForm = () => {
 
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [randomCode, setRandomCode] = useState('');
  const [userCode, setUserCode] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [money, setMoney] = useState(0);
  const [minute, setMinute] = useState(0);
  const [secound, setSecound] = useState(0);
  const [value, setValue] = useState(0);
  const {id} = useParams();

  const navigate = useNavigate();

  useEffect(()=>{
    setTimeout(async() => {
      let current_transaction = await request.Post(Url.get_transaction, {transaction_id:id});
      if(current_transaction && current_transaction.status === "paid")navigate(Router_path.root);
      if(!current_transaction){
        alert('خطایی رخ داده است ');
        navigate(Router_path.root);
      }
      setMoney(current_transaction.total_price);
      const time_start = current_transaction.time_start;
      setInterval(async() => {
        let elepsed_time = Number(((new Date().getTime()) / 1000).toFixed(0)) - time_start;
        let remaining_time = 600 - elepsed_time;
        let minute2 = String(Math.floor(remaining_time / 60));
        if(minute2.length === 1)minute2 = '0' + minute2;
        setMinute(minute2);
        let secound1 = String(remaining_time % 60);
        if(secound1.length === 1)secound1 = '0' + secound1;
        setSecound(secound1);
        if(600 - elepsed_time <= 0 ){
          let current_transaction = Cookies.get('current_transaction');
           if(current_transaction){
           await request.Post(Url.remove_transaction, {transaction_id: current_transaction});
          Cookies.remove('current_transaction');
        }
          navigate(Router_path.cart);
        }
      }, 1000);
    }, 500);
  })



  function reverseString(str) {
    var splitString = str.split("");
    var joinArray = splitString.join("");
    var x = joinArray[joinArray.length-1] + joinArray.substring(0,joinArray.length-1);
    return x;
}


    
 

  const setCard = (value)=>{
    let value2 = '';
    let newVal = '               ';
    for(let i=0;i<value.length;i++)if(value[i] !== ' ' && value[i] !== '-')value2+=value[i];
    if(last_val.length < value2.length && value2.length < 17)value = reverseString(value2);
    else if(value2.length > 16)value = last_val;
    else{
      value = last_val.substring(1,last_val.length);
    }
    last_val = value;
    for(let i=0;i<value.length % 4;i++){
      newVal += ' ' + value[i];
    }
    if(value.length %4  !== 0 && value.length > 4)newVal += '                    -                    ' ;
      for(let i=value.length%4;i<value.length;i++){
        newVal += ' ' + value[i]
        if((i+1) % 4 === value.length % 4 && i !== value.length-1 && i !== value.length % 4)newVal += '                    -                    ' ;
      }
      setValue(value2);
      setCardNumber(newVal);
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    setPaymentStatus('');
    if (userCode !== randomCode) {
      setPaymentStatus('رمز پویا نادرست است');
      return
    }
    else if (value.length !== 16 || isNaN(value)) {
      setPaymentStatus('شماره کارت باید 16 رقمی باشد');
      return
    }
    else if (expiryMonth.length !== 2 || isNaN(expiryMonth) || Number(expiryMonth) < 1 || Number(expiryMonth) > 12 || (Number(expiryYear) < 3) || (Number(expiryYear) === 3 && Number(expiryMonth) < 3)) {
      setPaymentStatus('تاریخ انفضا را به درستی وارد نکرده اید');
      return
    }
    else if (expiryYear.length !== 2 || isNaN(expiryYear)) {
      setPaymentStatus('تاریخ انفضا را به درستی وارد نکرده اید');
      return
    }
    else if ((cvv.length !== 4 && cvv.length !== 3) || isNaN(cvv)) {
      setPaymentStatus('cvv2 باید 3 یا 4 رقمی');
      return
    }
    let current_transaction1 = await request.Post(Url.get_transaction, {transaction_id:id});
    let transaction = await request.Post(Url.update_transaction, current_transaction1);
    if(transaction){
      alert('تراکنش با موفقیت انجام شد');
      Cookies.remove('cart');
      navigate(Router_path.root);
    }else{
      alert('تراکنش با خطا مواجه شد');
    }
  };

  // Generate a random code for checking not being a robot
  const generateRandomCode = () => {
    const random = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit random code
    const randomCodeString = random.toString();
    setRandomCode(randomCodeString);
    setUserCode('');
    alert('رمز پویا : ' + randomCodeString);
  };


  const handleBottomButtonClick = () => {
    navigate(Router_path.root);
  };

  return (
    <div className="payment-form">
        <button className="top-left-button" onClick={handleBottomButtonClick}>انصراف و ادامه خرید</button>
      <h2>{secound} : {minute}</h2>
      <h2 className='payment-header'>نام فروشگاه     :   از من بخر</h2>
      <h2 className="payment-header">مبلغ قابل پرداخت : {money_standard(money)} تومان</h2>
      <form onSubmit={handleSubmit}>
      {paymentStatus && <p className="payment-status">{paymentStatus}</p>}
        <div className="form-group">
          <label className="form-label">شماره کارت</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCard(e.target.value)}
            className="form-input"
            placeholder='               4 5 6 7                    -                    9 1 2 3                    -                    5 6 7 8                    -                    1 2 3 4'
            required
            maxLength={200}
          />
        </div>
        <div className="form-group expiry-group">
          <div className="expiry-input">
            <h4 className="form-label">تاریخ انقضا</h4>
            <input
              type="text"
              value={expiryMonth}
              onChange={(e) => setExpiryMonth(e.target.value)}
              className="form-input"
              placeholder='ماه'
              required
              maxLength={2}
            />
          </div>
          <div className="expiry-input">
          <h4 className="form-label hide-label">تاریخ انقضا</h4>
            <input
              type="text"
              value={expiryYear}
              onChange={(e) => setExpiryYear(e.target.value)}
              className="form-input"
              placeholder='سال'
              required
              maxLength={2}
            />
          </div>
        </div>
        <div className="form-group cvv2-section">
          <label className="form-label">CVV2</label>
          <input
            type="password"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            className="form-input"
            placeholder='کد 3 یا 4 رقمی'
            required
            maxLength={4}
          />
        </div>
        <div className="form-group">
          <label className="form-label">رمز پویا</label>
          <div className="random-code">
            <input
              type="text"
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              className="form-input random-code-input"
              placeholder='1 2 3 4'
            />
            <button type="button" className="generate-code-btn" onClick={generateRandomCode}>ارسال رمز پویا</button>
          </div>
        </div>
        <button type="submit" className="pay-btn">پرداخت</button>
      </form>
    </div>
  );
};

export default PaymentForm;
