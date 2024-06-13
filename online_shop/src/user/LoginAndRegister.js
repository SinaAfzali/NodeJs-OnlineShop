import React, { useState,  } from 'react';
import '../css/LoginAndRegister.css'; 
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Router_path from '../utilities/routes';
const request = require('../utilities/HTTP_REQUEST');
const Url = require('../utilities/urls');
const { userNameValidator, validatePasswords }  =  require('../utilities/functions'); 



const LoginAndRegister = () => {
  const [notification,] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  let userTypeLogin = 'customer';
  let userTypeRegister = 'customer';

  const setType = (val, reg_or_login)=>{
    if(reg_or_login === 'register'){
      userTypeRegister = val;
      document.getElementById('userTypeRegister').value = val;
      inputChange();
    }else if(reg_or_login === 'login'){
      userTypeLogin = val;
      document.getElementById('userTypeLogin').value = val;
    }
  }

  const handleRegister = async () => {
    let usernameInput = document.getElementById('userNameRegister');
    let usernameValidatorLabel = document.getElementById('userNameValidatorLabel');
    let passwordInput = document.getElementById('passwordRegister');
    let confirmPasswordInput = document.getElementById('confirmPasswordRegister');
    let passwordValidatorLabel = document.getElementById('passwordValidatorLabel');
    let passwordMatchValidatorLabel = document.getElementById('passwordMatchValidatorLabel');


    let isUsernameValid = await userNameValidator(usernameInput, usernameValidatorLabel);
    let arePasswordsValid = validatePasswords(passwordInput, confirmPasswordInput, passwordValidatorLabel, passwordMatchValidatorLabel);

    if (isUsernameValid && arePasswordsValid) {
      let userData = {
        userName: String(usernameInput.value),
        password: String(passwordInput.value),
        role: String(userTypeRegister),// Add user type to the data
      };

      let result = await request.Post(Url.register_url, userData);
      if(result){
        alert("ثبت نام با موفقیت انجام شد. اکنون می توانید وارد شوید");
        setShowNotification(true);
        document.getElementById('check').checked = false;
      }else{
        alert('کاربری با این اطلاعات از قبل وجود دارد')
      }
    }
  };

  const navigate = useNavigate();


  const handleLogin = async () => {
    let usernameInput = document.getElementById('userNameLogin');
    let passwordInput = document.getElementById('passwordLogin');
    let loginErrorLabel = document.getElementById('loginErrorLabel');
    loginErrorLabel.innerHTML = '';

    let userData = {
      userName: String(usernameInput.value),
      password: String(passwordInput.value),
      role: String(userTypeLogin),
    };



   

    let result = await request.Post(Url.login_url, userData);
    if (result !== null) {
     // Successful login logic, e.g., redirect to the dashboard
      
      const cookieValue = Cookies.get('Login');
      if(!cookieValue){
        const token = await request.Post(Url.tokenLogin_url, {userName: userData.userName, role: userData.role});
        Cookies.set('Login', token, { expires: 7 });
      }
      if(userData.role === 'seller'){
        navigate(Router_path.sellerAcount);
      }else{
        navigate(Router_path.CustomerAccount);
      }
      

    } else {
      alert('نام کاربری یا رمز عبور اشتباه است');
    }
    
  };

  const inputChange = () => {
    let usernameInput = document.getElementById('userNameRegister');
    let usernameValidatorLabel = document.getElementById('userNameValidatorLabel');
    userNameValidator(usernameInput, usernameValidatorLabel, userTypeRegister);
  };

  const passwordChange = () => {
    let passwordInput = document.getElementById('passwordRegister');
    let confirmPasswordInput = document.getElementById('confirmPasswordRegister');
    let passwordValidatorLabel = document.getElementById('passwordValidatorLabel');
    let passwordMatchValidatorLabel = document.getElementById('passwordMatchValidatorLabel');
    validatePasswords(passwordInput, confirmPasswordInput, passwordValidatorLabel, passwordMatchValidatorLabel);
  };

  const confirmPasswordChange = () => {
    passwordChange();
  };

  return (
    <div className="container">
      {showNotification && <div className="notification">{notification}</div>}
      <input type="checkbox" id="check" />
      <div className="login & Signup form">
        <label id='loginErrorLabel'></label>
        <header>صفحه ورود</header>
        <form action="#">
          <input id='userNameLogin' type="text" placeholder="نام کابری خود را وارد کنید" />
          <input id='passwordLogin' type="password" placeholder="رمز عبور خود را وارد کنید" />
          <select id="userTypeLogin" onChange={(e) => setType(e.target.value, 'login')}>
            <option value="customer">مشتری</option>
            <option value="seller">فروشنده</option>
          </select>
          <a href='#'>رمز عبور خود را فراموش کرده اید؟</a>
          <input type="button" className="button" value="ورود" onClick={handleLogin} />
        </form>
        <div className="signup">
          <span className="signup">حساب کاربری ندارید ؟
            <label htmlFor="check">ثبت نام</label>
          </span>
        </div>
      </div>
      <div className="registration form">
        <header>صفحه ثبت نام</header>
        <form action="#">
          <input onInput={inputChange} id="userNameRegister" type="text" placeholder="نام کابری مدنظر خود را وارد کنید" />
          <label id="userNameValidatorLabel"></label>
          <input onInput={passwordChange} id="passwordRegister" type="password" placeholder="رمز عبور خود را وارد کنید" />
          <label id="passwordValidatorLabel"></label>
          <input onInput={confirmPasswordChange} id="confirmPasswordRegister" type="password" placeholder="رمز عبور خود را تایید کنید" />
          <label id="passwordMatchValidatorLabel"></label>
          <select id="userTypeRegister" onChange={(e) => setType(e.target.value, 'register')}>
            <option value="customer">مشتری</option>
            <option value="seller">فروشنده</option>
          </select>
          <input type="button" className="button" value="ثبت نام" onClick={handleRegister} />
        </form>
        <div className="signup">
          <span className="signup">قبلا ثبت نام کرده اید ؟
            <label htmlFor="check">ورود</label>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginAndRegister;