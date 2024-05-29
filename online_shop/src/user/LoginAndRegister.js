import React, { useState, useEffect } from 'react';
import '../css/LoginAndRegister.css'; 
import { userNameValidator, validatePasswords } from '../utilities/functions'; 
import Cookies from 'js-cookie';
const request = require('../utilities/HTTP_REQUEST');
const Url = require('../utilities/urls');


const LoginAndRegister = () => {
  const [notification,] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const handleRegister = async () => {
    let usernameInput = document.getElementById('userNameRegister');
    let usernameValidatorLabel = document.getElementById('userNameValidatorLabel');
    let passwordInput = document.getElementById('passwordRegister');
    let confirmPasswordInput = document.getElementById('confirmPasswordRegister');
    let passwordValidatorLabel = document.getElementById('passwordValidatorLabel');
    let passwordMatchValidatorLabel = document.getElementById('passwordMatchValidatorLabel');

    let role = "customer";

    let isUsernameValid = await userNameValidator(usernameInput, usernameValidatorLabel, role);
    let arePasswordsValid = validatePasswords(passwordInput, confirmPasswordInput, passwordValidatorLabel, passwordMatchValidatorLabel);

    if (isUsernameValid && arePasswordsValid) {
      let userData = {
        userName: String(usernameInput.value),
        password: String(passwordInput.value),
        role: "customer"
      };

      let result = await request.Post(Url.register_url, userData);
      if(result === "ok"){
        alert("ثبت نام با موفقیت انجام شد. اکنون می توانید وارد شوید");
        setShowNotification(true);
        document.getElementById('check').checked = false;
      }
    }
  };

  const handleLogin = async () => {
    let usernameInput = document.getElementById('userNameLogin');
    let passwordInput = document.getElementById('passwordLogin');

    let userData = {
      userName: String(usernameInput.value),
      password: String(passwordInput.value),
      role: "customer"
    };

    let result = await request.Post(Url.login_url, userData);
    if (result !== null) {
     // Successful login logic, e.g., redirect to the dashboard
      
      const cookieValue = Cookies.get('Login');
      if(!cookieValue){
        const token = await request.Post(Url.tokenLogin_url, {userName: userData.userName, role: userData.role});
        Cookies.set('Login', token, { expires: 7 });
      }

    

    } else {
      alert('نام کاربری یا رمز عبور اشتباه است');
    }
  };

  const inputChange = () => {
    let usernameInput = document.getElementById('userNameRegister');
    let usernameValidatorLabel = document.getElementById('userNameValidatorLabel');
    let role = "customer";
    userNameValidator(usernameInput, usernameValidatorLabel, role);
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

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000); // Hide notification after 5 seconds

      return () => clearTimeout(timer); // Clear timeout if component unmounts
    }
  }, [showNotification]);

  return (
    <div className="container">
      {showNotification && <div className="notification">{notification}</div>}
      <input type="checkbox" id="check" />
      <div className="login & Signup form">
        <header>صفحه ورود</header>
        <form action="#">
          <input id='userNameLogin' type="text" placeholder="نام کابری خود را وارد کنید" />
          <input id='passwordLogin' type="password" placeholder="رمز عبور خود را وارد کنید" />
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
