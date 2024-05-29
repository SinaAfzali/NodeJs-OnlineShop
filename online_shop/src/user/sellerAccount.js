// src/SellerAccount.js
import React from 'react';
import '../css/sellerAccount.css';

const tasks = [
  { name: 'Dashboard' },
  { name: 'Add Product' },
  { name: 'View Products' },
  { name: 'Sales History' },
  { name: 'Settings' },
];

const Taskbar = ({ tasks }) => {
  return (
    <div className="taskbar">
      {tasks.map((task, index) => (
        <div key={index} className="taskbar-item">
          {task.name}
        </div>
      ))}
    </div>
  );
};

const SellerAccount = () => {
  const profileImageUrl = 'https://i.pinimg.com/736x/c2/27/80/c22780e94509f7d8b7745f68f1cfb897.jpg'; // Replace with your image URL

  return (
    <div className="seller-account">
      <Taskbar tasks={tasks} />
      <div className="main-content">
        <div className="header">
          <h1>Seller Account</h1>
        </div>
        <div className="content">
          <div className="profile-section">
            <h2>Profile Information</h2>
            <div className="profile-photo">
              <img src={profileImageUrl} alt="Profile" />
            </div>
            {/* Include additional profile information here */}
          </div>
          <div className="settings-section">
            <h2>Account Settings</h2>
            {/* Include account settings here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerAccount;
