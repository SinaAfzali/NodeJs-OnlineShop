const request = require('./HTTP_REQUEST');


const userNameValidator = async (userInput ,  usernameValidator, role) => {
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

const validatePasswords = (passwordInput, confirmPasswordInput, passwordValidatorLabel, passwordMatchValidatorLabel) => {
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



const money_standard = (money)=>{
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



function checkCharacterOrder(subString, mainString) { 
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


module.exports = { 
  userNameValidator, 
  validatePasswords,
  money_standard,
  checkCharacterOrder,
};
