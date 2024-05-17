import React, { useState } from 'react';
import './css/LoginAndRegister.css'; 
import {userNameValidator }from './functions'; 



const LoginAndRegister = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Assuming the user is not logged in initially

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleLogin = () => {
//     // var xhr = new XMLHttpRequest();
//     // xhr.open('GET', 'http://localhost:9000/api/product/add', true);
//     // xhr.send();
//      setIsLoggedIn(!isLoggedIn);
//      const root = ReactDOM.createRoot(document.getElementById('root'));
//     root.render(
//       <React.StrictMode>
//          <AddProduct />
//       </React.StrictMode>
// );
//   };

  const inputchange = () => {
    let usenameInp = document.getElementById('userNameRegister');
    let usernamevalidLabel = document.getElementById('userNameValidatorLabel');
    userNameValidator(usenameInp,usernamevalidLabel);

  };

  return (<div class="container">
    <input type="checkbox" id="check"/>
    <div class="login & Signup form">
      <header>صفحه ورود</header>
      <form action="#">
        <input type="text" placeholder="نام کابری خود را وارد کنید"/>
        <input type="password" placeholder="رمز عبور خود را وارد کنید"/>
        <a href='#'>رمز عبور خود را فراموش کرده اید؟</a>
        <input type="button" class="button" value="ورود"/>
      </form>
      <div class="signup">
        <span class="signup">حساب کاربری ندارید ؟
         <label for="check">ثبت نام</label>
        </span>
      </div>
    </div>
    <div class="registration form">
      <header>صفحه ثبت نام</header>
      <form action="#">
        <input type="text" placeholder="ایمیل خود را وارد کنید"/>
        <input onInput={inputchange} id="userNameRegister" type="text" placeholder="نام کابری مدنظر خود را وارد کنید"/>
        <label id="userNameValidatorLabel"></label>
        <input type="password" placeholder="رمز عبور خود را وارد کنید"/>
        <input type="password" placeholder="رمز عبور خود را تایید کنید"/>
        <input type="button" class="button" value="ثبت نام"/>
      </form>
      <div class="signup">
        <span class="signup">قبلا ثبت نام کرده اید ؟
         <label for="check">ورود</label>
        </span>
      </div>
    </div>
  </div>);
};


export default LoginAndRegister;
