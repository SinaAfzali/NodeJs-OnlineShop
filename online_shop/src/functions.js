const request = require('./HTTP_REQUEST');

const userNameValidator = async (userinput, usenamevalidator)=>
{
  let apiUrl_validUserName = 'http://localhost:9000/api/user/username/validator';
  let pattern = /^[a-zA-Z0-9]+$/;
    if(userinput.value && !pattern.test(String(userinput.value))){
        usenamevalidator.style.color = 'red';
        usenamevalidator.innerHTML = 'نام کابری فقط میتواند شامل اعداد و حروف انگلیسی باشد';
      }
       else if(String(userinput.value).length < 5){
        usenamevalidator.style.color = 'red';
        usenamevalidator.innerHTML = 'نام کابری باید حداقل 5 کاراکتر داشته باشد';
      }
       else {
        // send usename to server
        let result = await request.Post(apiUrl_validUserName, {userName:String(userinput.value)}); 
  
        if(result === "ok"){
        usenamevalidator.innerHTML = 'نام کاربری در دسترس است';
        usenamevalidator.style.color = 'green';
        }else {
          usenamevalidator.innerHTML = 'این نام کاربری قبلا استفاده شده است';
        usenamevalidator.style.color = 'red';
        }
      }
    };


    const passwordValidator = (passwordInput, passwordValidatorLabel) => {
      let pattern = /^[a-zA-Z0-9-_]+$/;
      if (passwordInput.value && !pattern.test(passwordInput.value)) {
        passwordValidatorLabel.style.color = 'red';
        passwordValidatorLabel.innerHTML = 'رمز عبور فقط میتواند شامل حروف، اعداد، - و _ باشد';
      } else if (passwordInput.value.length < 4) {
        passwordValidatorLabel.style.color = 'red';
        passwordValidatorLabel.innerHTML = 'رمز عبور باید حداقل 4 کاراکتر داشته باشد';
      } else {
        passwordValidatorLabel.style.color = 'green';
        passwordValidatorLabel.innerHTML = 'رمز عبور معتبر است';
      }
    };
    
    module.exports = { userNameValidator, passwordValidator };

