const request = require('./HTTP_REQUEST');

const userNameValidator = async (userInput, usernameValidator) => {
  let apiUrl_validUserName = 'http://localhost:9000/api/user/register/username/validator';
  let pattern = /^[a-zA-Z0-9]+$/;
  if (userInput.value && !pattern.test(String(userInput.value))) {
    usernameValidator.style.color = 'red';
    usernameValidator.innerHTML = 'نام کابری فقط میتواند شامل اعداد و حروف انگلیسی باشد';
  } else if (String(userInput.value).length < 5) {
    usernameValidator.style.color = 'red';
    usernameValidator.innerHTML = 'نام کابری باید حداقل 5 کاراکتر داشته باشد';
  } else {
    let result = await request.Post(apiUrl_validUserName, { userName: String(userInput.value) });
    if (result === "ok") {
      usernameValidator.innerHTML = 'نام کاربری در دسترس است';
      usernameValidator.style.color = 'green';
    } else {
      usernameValidator.innerHTML = 'این نام کاربری قبلا استفاده شده است';
      usernameValidator.style.color = 'red';
    }
  }
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

  if (confirmPasswordInput.value !== '' && passwordInput.value !== confirmPasswordInput.value) {
    passwordMatchValidatorLabel.style.color = 'red';
    passwordMatchValidatorLabel.innerHTML = 'رمز عبور و تایید رمز عبور مطابقت ندارند';
    isValid = false;
  } else {
    passwordMatchValidatorLabel.innerHTML = '';
  }

  return isValid;
};

module.exports = { userNameValidator, validatePasswords };
