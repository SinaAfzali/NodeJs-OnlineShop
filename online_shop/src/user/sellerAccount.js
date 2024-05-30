// src/SellerAccount.js
import '../css/sellerAccount.css';
import '../css/addProduct.css'; // Import CSS file for styling
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Router_path from '../utilities/routes';
const request = require('../utilities/HTTP_REQUEST');
const Url = require('../utilities/urls');



let token =  Cookies.get('Login');
let result = await request.Post(Url.tokenValidator, {token: token});
let userNameSeller = '';
if(result)userNameSeller = result.userName;



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
        <div id={"task-item"+String(index)} key={index} className="taskbar-item">
          {task.name}
        </div>
      ))}
    </div>
  );
};













const SellerAccount = () => {
   const navigate = useNavigate();
   setTimeout(() => {
    document.getElementById('task-item0').addEventListener('click', ()=>{
     navigate(Router_path.addProduct);
    });
    document.getElementById('task-item1').addEventListener('click', ()=>{
      navigate(Router_path.addProduct);
     });
     document.getElementById('task-item2').addEventListener('click', ()=>{
      navigate(Router_path.addProduct);
     });
     document.getElementById('task-item3').addEventListener('click', ()=>{
      navigate(Router_path.addProduct);
     });
     document.getElementById('task-item4').addEventListener('click', ()=>{
      Cookies.remove('Login');
      navigate(Router_path.root);
     });

    document.getElementById('header-user').innerHTML = userNameSeller + '(فروشنده)';
  }, 500);

  return (
    <div className="seller-account">
      <Taskbar tasks={tasks} />
      <div className="main-content">
        <div className="header">
          <h1 id="header-user"></h1>
        </div>
        <div id='content-div' className="content">






        </div>
      </div>
    </div>
  );
};







export default SellerAccount;
