// src/SellerAccount.js
import React from 'react';
import '../css/sellerAccount.css';

const tasks = [
  { name: 'پروفایل' },
  { name: 'افزودن محصول' },
  { name: 'نمایش محصولات من' },
  { name: 'سوابق فروش' },
  { name: 'خروج' },
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
              <img src="/online_shop/public/logo192.png" alt="Profile" />
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
