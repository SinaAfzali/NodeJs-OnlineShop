import React, { useState } from 'react';
import '../css/Profile.css';

const Profile = ({ userName, userPicture, role }) => {
  const [editOption, setEditOption] = useState('none');
  const [newUserName, setNewUserName] = useState(userName);
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
        <img src={newImage || userPicture} alt={`${userName}'s profile`} />
      </div>
      <div className="profile-info">
        <h2>{userName}</h2>
        <p>{role}</p>
        <select value={editOption} onChange={handleEditOptionChange}>
          <option value="none">Select Option</option>
          <option value="editUsername">Edit Username</option>
          <option value="changeImage">Change Profile Image</option>
        </select>
        {editOption === 'editUsername' && (
          <div>
            <input type="text" value={newUserName} onChange={handleUserNameChange} />
          </div>
        )}
        {editOption === 'changeImage' && (
          <div>
            <input type="file" onChange={handleImageChange} />
          </div>
        )}
        <button onClick={handleSubmit}>Save Changes</button>
      </div>
    </div>
  );
};

export default Profile;
