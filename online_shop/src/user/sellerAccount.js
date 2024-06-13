import React, { useState } from 'react';
import '../css/sellerAccount.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Router_path from '../utilities/routes'; // Import routes without destructuring
import Profile from './Profile';
import ProductDisplay from './ProductDisplay';
import SalesHistory from './SalesHistory';
import AddProduct from '../product/addProduct';
import ChangeProduct from '../product/changeProduct'; // Import ChangeProduct component

const tasks = [
  { name: 'صفحه اصلی' },
  { name: 'پروفایل' },
  { name: 'افزودن محصول' },
  { name: 'نمایش محصولات من' },
  { name: 'سوابق فروش' },
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

const SellerAccount = () => {
  const [showProfile, setShowProfile] = useState(true);
  const [showProductDisplay, setShowProductDisplay] = useState(false);
  const [showSalesHistory, setShowSalesHistory] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showChangeProduct, setShowChangeProduct] = useState(false); // State for displaying ChangeProduct component

  const navigate = useNavigate();

  const handleTaskClick = (index) => {
    switch (index) {
      case 0:
        navigate(Router_path.root);
        break;
      case 1:
        setShowProfile(true);
        setShowProductDisplay(false);
        setShowSalesHistory(false);
        setShowAddProduct(false);
        setShowChangeProduct(false); // Hide ChangeProduct component
        break;
      case 2:
        setShowAddProduct(true);
        setShowProfile(false);
        setShowProductDisplay(false);
        setShowSalesHistory(false);
        setShowChangeProduct(false); // Hide ChangeProduct component
        break;
      case 3:
        setShowProfile(false);
        setShowProductDisplay(true);
        setShowSalesHistory(false);
        setShowAddProduct(false);
        setShowChangeProduct(false); // Hide ChangeProduct component
        break;
      case 4:
        setShowProfile(false);
        setShowProductDisplay(false);
        setShowSalesHistory(true);
        setShowAddProduct(false);
        setShowChangeProduct(false); // Hide ChangeProduct component
        break;
      case 5:
        Cookies.remove('Login');
        navigate(Router_path.root);
        break;
      default:
        break;
    }
  };

  const handleShowChangeProduct = () => {
    setShowChangeProduct(true);
    setShowProfile(false);
    setShowProductDisplay(false);
    setShowSalesHistory(false);
    setShowAddProduct(false);
  };

  return (
    <div className="seller-account">
      <Taskbar tasks={tasks} onTaskClick={handleTaskClick} />
      <div className="main-content">
        <div id='content-div' className="content">
          {showProfile && <Profile userName="Sample User" userPicture="https://via.placeholder.com/150" role="Seller" />}
          {showProductDisplay && <ProductDisplay />}
          {showAddProduct && <AddProduct />}
          {showSalesHistory && <SalesHistory />}
          {showChangeProduct && <ChangeProduct />} {/* Conditionally render ChangeProduct component */}
        </div>
      </div>
    </div>
  );
};

export default SellerAccount;
