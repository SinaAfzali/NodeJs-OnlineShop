import React, { useState, useEffect } from 'react';
import './css/LoginAndRegister.css'; 
import { userNameValidator, validatePasswords } from './functions'; 
import Cookies from 'js-cookie';
const request = require('./HTTP_REQUEST');

const url_register = 'http://localhost:9000/api/user/register/form';
const url_login = 'http://localhost:9000/api/user/login/form';
const url_getToken = 'http://localhost:9000/api/user/login/token';


const LoginAndRegister = () => {
  const [notification, setNotification] = useState('');
  const [showNotification, setShowNotification] = useState(false);

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
        password: String(passwordInput.value)
      };

      let result = await request.Post(url_register, userData);
      if(result === "ok"){
        setNotification('ثبت نام با موفقیت انجام شد! اکنون می توانید وارد شوید.');
        setShowNotification(true);
        document.getElementById('check').checked = false;
      }
    }
  };

  const handleLogin = async () => {
    let usernameInput = document.getElementById('userNameLogin');
    let passwordInput = document.getElementById('passwordLogin');
    let loginErrorLabel = document.getElementById('loginErrorLabel');
    loginErrorLabel.innerHTML = '';

    let userData = {
      userName: String(usernameInput.value),
      password: String(passwordInput.value)
    };

    let result = await request.Post(url_login, userData);
    if (result !== null) {
      // Successful login logic, e.g., redirect to the dashboard
      // const token = await request.Post(url_getToken, {userName: userData.userName});
      // Cookies.set('Authorization', token, { expires: 7 });

    //   const cookieValue = Cookies.get('Authorization');
    //   console.log(cookieValue);
    //   jwt.verify(cookieValue, SEKRET_KEY, (err, decoded) => {
    //     if (err) {
    //         console.error('خطا در تایید توکن:', err);
    //     } else {
    //         console.log(decoded); // اطلاعات اصلی (payload) توکن JWT
    //     }
    // });

    } else {
      loginErrorLabel.style.color = 'red';
      loginErrorLabel.innerHTML = 'نام کاربری یا رمز عبور اشتباه است';
    }
  };

  const inputChange = () => {
    let usernameInput = document.getElementById('userNameRegister');
    let usernameValidatorLabel = document.getElementById('userNameValidatorLabel');
    userNameValidator(usernameInput, usernameValidatorLabel);
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
        <label id='loginErrorLabel'></label>
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
