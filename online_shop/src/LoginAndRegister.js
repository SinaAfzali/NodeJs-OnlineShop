import React from 'react';
import './css/LoginAndRegister.css'; 
import { userNameValidator, validatePasswords } from './functions'; 




const LoginAndRegister = () => {

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
        userName: usernameInput.value,
        password: passwordInput.value
      };

      // Send the data to the server
      fetch('http://localhost:9000/api/user/register/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // Handle success case
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error case
      });
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

  return (
    <div className="container">
      <input type="checkbox" id="check"/>
      <div className="login & Signup form">
        <header>صفحه ورود</header>
        <form action="#">
          <input type="text" placeholder="نام کابری خود را وارد کنید"/>
          <input type="password" placeholder="رمز عبور خود را وارد کنید"/>
          <a href='#'>رمز عبور خود را فراموش کرده اید؟</a>
          <input type="button" className="button" value="ورود"/>
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
          <input type="text" placeholder="ایمیل خود را وارد کنید"/>
          <input onInput={inputChange} id="userNameRegister" type="text" placeholder="نام کابری مدنظر خود را وارد کنید"/>
          <label id="userNameValidatorLabel"></label>
          <input onInput={passwordChange} id="passwordRegister" type="password" placeholder="رمز عبور خود را وارد کنید"/>
          <label id="passwordValidatorLabel"></label>
          <input onInput={confirmPasswordChange} id="confirmPasswordRegister" type="password" placeholder="رمز عبور خود را تایید کنید"/>
          <label id="passwordMatchValidatorLabel"></label>
          <input type="button" className="button" value="ثبت نام" onClick={handleRegister}/>
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
