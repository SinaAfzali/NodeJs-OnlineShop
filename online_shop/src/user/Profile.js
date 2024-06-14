import React, { useState } from 'react';
import '../css/Profile.css';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { money_standard } from '../utilities/functions';

const request = require('../utilities/HTTP_REQUEST');
const Url = require('../utilities/urls');



var fileData_upload = '';
let token = Cookies.get('Login');
let current_user = await request.Post(Url.tokenValidator, { token: token });

const Profile = ({ userName, userPicture}) => {

  useEffect(()=>{
   async function getUerData(){
      let data = await request.Post(Url.get_user_info, {userName:current_user.userName, role: current_user.role});
        if(data){
           let image = await require(('../images/usersImage/' + data.image));
           setNewImage(image);
    }
   }
   getUerData();
   setTimeout(async() => {
    token = Cookies.get('Login');
    current_user = await request.Post(Url.tokenValidator, { token: token });
    setNewUserName(current_user.userName);
    if(current_user.role === 'seller')setRole('فروشنده');
    else {
      document.getElementById('money-user').style.display = 'none';
      setRole('خریدار');
    }
   }, 100);
  })

  const [editOption, setEditOption] = useState('none');
  const [newUserName, setNewUserName] = useState(userName);
  const [role, setRole] = useState(userName);
  const [newImage, setNewImage] = useState('');
  const [change, setChange] = useState('');

  const handleEditOptionChange = (e) => {
    setEditOption(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setNewUserName(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; 
    fileData_upload = new FormData(); 
    fileData_upload.append('file', file); 
    setChange('image');
  };

  const handleSubmit = async() => {
   if(change === 'image'){
    const response = await fetch('http://localhost:9000/upload/userImage', { 
      method: 'POST', 
      body: fileData_upload 
  }); 
  if (response.ok) { 
    const data = await response.json();
  //   let data1 = await request.Post(Url.get_user_info, {userName:current_user.userName, role: current_user.role});
  //   let file = new FormData(); 
  //   file.append('file', data1.image); 
  //   if(data1){
  //     await fetch('http://localhost:9000/removeImage/user', { 
  //     method: 'POST', 
  //     body: file
  // }); 
  //   }
    let update = await request.Post(Url.user_update_url, {userName:current_user.userName, role:current_user.role, image:data});
    if(update)alert('عکس شما با موفقیت تغییر کرد');
    let image = await require(('../images/usersImage/' + data));
    setNewImage(image);
  } else { 
      console.error('خطا در ارسال فایل.'); 
  } 
   }
  };

  return (
    <div className="profile-panel">
      <div className="profile-picture">
        <img src={newImage || userPicture} alt={`${newUserName}'s profile`} />
      </div>
      <div className="profile-info">
        <h2 id='usename-profile'>{newUserName}</h2>
        <h2 id='role-profile'>{role}</h2>
        <h2 id='money-user'>موجودی : {money_standard(current_user.money)} تومان</h2>
        <select value={editOption} onChange={handleEditOptionChange}>
          <option value="none">انتخاب کنید</option>
          <option value="تغییر رمز عبور">تغییر رمز عبور</option>
          <option value="انتخاب یا تغییر عکس">انتخاب یا تغییر عکس</option>
        </select>
        {editOption === "تغییر رمز عبور" && (
          <div>
            <input type="text" value={newUserName} onChange={handleUserNameChange} />
          </div>
        )}
        {editOption === "انتخاب یا تغییر عکس" && (
          <div>
            <input type="file" onChange={handleImageChange} />
          </div>
        )}
        <button onClick={handleSubmit}>ذخیره تغییرات</button>
      </div>
    </div>
    
  );
};

export default Profile;
