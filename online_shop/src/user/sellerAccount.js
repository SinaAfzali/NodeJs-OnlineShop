import React, { useState, useEffect } from 'react';
import '../css/sellerAccount.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Router_path from '../utilities/routes'; // Import routes without destructuring
import Profile from './Profile';
import ProductDisplay from './ProductDisplay';
import SalesHistory from './SalesHistory';
import AddProduct from '../product/addProduct';
import ChangeProduct from '../product/changeProduct'; // Import ChangeProduct component

const request = require('../utilities/HTTP_REQUEST');
const Url = require('../utilities/urls');



var tasks = [
  { name: 'صفحه اصلی' },
  { name: 'پروفایل' },
  { name: 'افزودن محصول' },
  { name: 'نمایش محصولات من' },
  { name: 'سوابق فروش' },
  { name: 'خروج' },
  { name: 'محصولات' },
  { name: 'سوابق فروش فروشگاه' }
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
  const [showChangeProduct, setShowChangeProduct] = useState(false);
  const [filter_disply, setFilterDisplay] = useState(false);

  const navigate = useNavigate();


  useEffect(()=>{
    setTimeout(async() => {
      
  let token = Cookies.get('Login');
  let current_user = await request.Post(Url.tokenValidator, { token: token });
  if(current_user && current_user.position === 'Member'){
    document.getElementById('task-item6').style.display = 'none';
    document.getElementById('task-item7').style.display = 'none';
  }
    }, 200);
  })
  

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
        setShowChangeProduct(false); 
        break;
      case 2:
        setShowAddProduct(true);
        setShowProfile(false);
        setShowProductDisplay(false);
        setShowSalesHistory(false);
        setShowChangeProduct(false); 
        break;
      case 3:
        setFilterDisplay(true);
        setShowProfile(false);
        setShowProductDisplay(false);
        setShowSalesHistory(false);
        setShowAddProduct(false);
        setShowChangeProduct(false); 
        setTimeout(() => {
          setShowProductDisplay(true);
        }, 200);
        break;
      case 4:
        setFilterDisplay(true);
        setShowProfile(false);
        setShowProductDisplay(false);
        setShowSalesHistory(false);
        setShowAddProduct(false);
        setShowChangeProduct(false); 
        setTimeout(() => {
          setShowSalesHistory(true);
        }, 200);
        break;
      case 5:
        Cookies.remove('Login');
        navigate(Router_path.root);
        break;
      case 6:
        setFilterDisplay(false);
        setShowProfile(false);
        setShowProductDisplay(false);
        setShowSalesHistory(false);
        setShowAddProduct(false);
        setShowChangeProduct(false); 
        setTimeout(() => {
          setShowProductDisplay(true);
        }, 200);
        break;
        case 7:
          setFilterDisplay(false);
          setShowProfile(false);
          setShowProductDisplay(false);
          setShowSalesHistory(false);
          setShowAddProduct(false);
          setShowChangeProduct(false); 
          setTimeout(() => {
            setShowSalesHistory(true);
          }, 200);
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
          {showProductDisplay && <ProductDisplay filter={filter_disply} />}
          {showAddProduct && <AddProduct />}
          {showSalesHistory && <SalesHistory filter={filter_disply} />}
          {showChangeProduct && <ChangeProduct />} {/* Conditionally render ChangeProduct component */}
        </div>
      </div>
    </div>
  );
};

export default SellerAccount;
