import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Router_path from '../utilities/routes';
import Profile from './Profile';
import BuysHistory from './BuysHistory'; // Import SalesHistory component

const tasks = [
  { name: 'صفحه اصلی' },
  { name: 'پروفایل' },
  { name: 'سوابق خرید' },
  { name: 'خروج' },
];

const Taskbar = ({ tasks, onTaskClick }) => {
  return (
    <div className="taskbar">
      {tasks.map((task, index) => (
        <div id={"task-item" + String(index)} key={index} className="taskbar-item" onClick={() => onTaskClick(index)}>
          {task.name}
        </div>
      ))}
    </div>
  );
};

const CustomerAccount = () => {
  const [showProfile, setShowProfile] = useState(true);
  const [showProductDisplay, setShowProductDisplay] = useState(false);
  const [showeBuysHistory, setShowBuysHistory] = useState(false); // State for displaying sales history

  const navigate = useNavigate();

  const handleTaskClick = (index) => {
    switch (index) {
      case 0:
        navigate(Router_path.root);
        break;
      case 1:
        setShowProfile(true);
        setShowBuysHistory(false); // Hide sales history
        break;
      case 2:
      
      case 3:
        Cookies.remove('Login');
        navigate(Router_path.root);
        break;
      default:
        break;
    }
  };

  return (
    <div className="seller-account">
      <Taskbar tasks={tasks} onTaskClick={handleTaskClick} />
      <div className="main-content">
        <div id='content-div' className="content">
          {showProfile && <Profile userName="Sample User" userPicture="https://via.placeholder.com/150" role="Seller" />}
          {showBuysHistory && <BuysHistory />} {/* Conditionally render SalesHistory component */}
        </div>
      </div>
    </div>
  );
};

export default CustomerAccount;
