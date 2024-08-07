import Cookies from 'js-cookie';
const request = require('./HTTP_REQUEST');
const Url = require('../utilities/urls'); 


export async function userNameValidator(userInput ,  usernameValidator, role){
  let apiUrl_validUserName = 'http://localhost:9000/api/user/register/username/validator';
  let pattern = /^[a-zA-Z0-9]+$/;
  let isValid = true;

  if (userInput.value && !pattern.test(String(userInput.value))) {
    usernameValidator.style.color = 'red';
    usernameValidator.innerHTML = 'نام کابری فقط میتواند شامل اعداد و حروف انگلیسی باشد';
    isValid = false;

  } else if (String(userInput.value).length < 5) {
    usernameValidator.style.color = 'red';
    usernameValidator.innerHTML = 'نام کابری باید حداقل 5 کاراکتر داشته باشد';
    isValid = false;
  } else {
    let result = await request.Post(apiUrl_validUserName, { userName: String(userInput.value), role: String(role) });
    if (result === "ok") {
      usernameValidator.innerHTML = 'نام کاربری در دسترس است';
      usernameValidator.style.color = 'green';
    } else {
      usernameValidator.innerHTML = 'این نام کاربری قبلا استفاده شده است';
      usernameValidator.style.color = 'red';
      isValid = false;
    }
  }
  return isValid;
};

export async function validatePasswords(passwordInput, confirmPasswordInput, passwordValidatorLabel, passwordMatchValidatorLabel) {
  let pattern = /^[a-zA-Z0-9_-]{4,}$/;
  let isValid = true;

  if (!pattern.test(String(passwordInput.value))) {
    passwordValidatorLabel.style.color = 'red';
    passwordValidatorLabel.innerHTML = 'رمز عبور باید حداقل 4 کاراکتر داشته باشد و شامل حروف بزرگ، حروف کوچک، اعداد، - و _ باشد';
    isValid = false;
  } else {
    passwordValidatorLabel.innerHTML = '';
  }

  if (passwordInput.value !== confirmPasswordInput.value) {
    passwordMatchValidatorLabel.style.color = 'red';
    passwordMatchValidatorLabel.innerHTML = 'رمز عبور و تایید رمز عبور مطابقت ندارند';
    isValid = false;
  } else {
    passwordMatchValidatorLabel.innerHTML = '';
  }

  return isValid;
};


export function money_standard(money){
  let m = String(money);
  let result = "";
  let len = m.length;
  let x = 0;
  if(len <= 3)return m;
  if(len % 3 !== 0){
    if(len % 3 === 1){
      result += String(m[x]);
      x++;len--;
    }else{
      result += String(m[x]);
      x++;len--;
      result += String(m[x]);
      x++;len--;
    }
    result += "/";
  }

  while(len > 3){
    result += m[x] + m[x+1] + m[x+2] + "/";
    x+=3;
    len-=3;
  }
  result += m[x] + m[x+1] + m[x+2];
  return result;

}



export function checkCharacterOrder(subString, mainString) { 
  let subIndex = 0; 
   
  for (let i = 0; i < mainString.length; i++) { 
    if (mainString[i] === subString[subIndex]) { 
      subIndex++; 
    } 
     
    if (subIndex === subString.length) { 
      return true; 
    } 
  } 
   
  return false; 
} 


export function update_cookie(cookieName, data, period){
  let cookieValue = Cookies.get(cookieName);
  cookieValue = data;
  Cookies.remove(cookieName);
  if(period !== 0)Cookies.set(cookieName, cookieValue, { expires: period });
  else Cookies.set(cookieName, cookieValue);
}

export function getCookie(cookieName){
  return Cookies.get(cookieName);
}



export function update_cart_cookie(product_id, plus_or_minus, limit){
  let current_number = 0;
  let cookieValue = getCookie('cart');
  let product_split = cookieValue.split(',');
  cookieValue = '';
    for(let i=0;i<product_split.length;i+=2){
      if(String(product_id) === product_split[i]){
        if(plus_or_minus === 'plus' && Number(product_split[i+1]) < limit){
          product_split[i+1] = Number(product_split[i+1]) + 1;
        }else if(plus_or_minus === 'minus' && Number(product_split[i+1]) > 1){
          product_split[i+1] = Number(product_split[i+1]) - 1;
        }
        current_number = Number(product_split[i+1]);
      }
      if(i !== product_split.length - 2){
        cookieValue += product_split[i] + ',' + product_split[i+1] + ',';
      }
      if(i === product_split.length - 2)cookieValue += product_split[i] + ',' + product_split[i+1];
    }
 
  update_cookie('cart', cookieValue, 0); 
  return current_number;
}

export async function check_login(){
  let token = Cookies.get('Login');
  if(token){
    let current_user = await request.Post(Url.tokenValidator, { token: token });
    return current_user;
  }else return null;
}