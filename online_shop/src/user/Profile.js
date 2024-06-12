import React, { useState } from 'react';
import '../css/Profile.css';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const request = require('../utilities/HTTP_REQUEST');
const Url = require('../utilities/urls');

const Profile = ({ userName, userPicture}) => {

  useEffect(()=>{
    let result;
   async function getUerData(){
    let token = Cookies.get('Login');
    result = await request.Post(Url.tokenValidator, { token: token });
   }
   getUerData();
   setTimeout(() => {
    setNewUserName(result.userName);
    setRole(result.role);
   }, 100);
  })

  const [editOption, setEditOption] = useState('none');
  const [newUserName, setNewUserName] = useState(userName);
  const [role, setRole] = useState(userName);
  const [newImage, setNewImage] = useState('');

  const handleEditOptionChange = (e) => {
    setEditOption(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setNewUserName(e.target.value);
  };

  const handleImageChange = (e) => {
    setNewImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = () => {
    // Your logic to handle username change or profile image update
    console.log('New username:', newUserName);
    console.log('New image:', newImage);
    // You can send the new username and/or image to the server or update them locally
  };

  return (
    <div className="profile-panel">
      <div className="profile-picture">
        <img src={newImage || userPicture} alt={`${newUserName}'s profile`} />
      </div>
      <div className="profile-info">
        <h2 id='usename-profile'>{newUserName}</h2>
        <p id='role-profile'>{role}</p>
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
