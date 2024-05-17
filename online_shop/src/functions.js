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
    }


module.exports = {userNameValidator};