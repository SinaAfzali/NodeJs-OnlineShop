import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import '../css/sellerAccount.css';
import { useNavigate } from 'react-router-dom';
import Router_path from '../utilities/routes';
const request = require('../utilities/HTTP_REQUEST');
const Url = require('../utilities/urls');
const {Product, } = require('../utilities/classes');



// get userName and role from cookie
var token, result;
var fileData_upload = '';


const tasks = [
  { name: 'صفحه اصلی' },
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




function AddProduct() {




  useEffect(() => {
    const validateToken = async () => {
      token = Cookies.get('Login');
      result = await request.Post(Url.tokenValidator, { token: token });
    };
    setTimeout(async () => {
      await validateToken();
      document.getElementById('header-user').innerHTML = ' (فروشنده) ' + result.userName;
    }, 100);
  }, []);



  const navigate = useNavigate();
   setTimeout(() => {
    document.getElementById('task-item0').addEventListener('click', ()=>{
      navigate(Router_path.root);
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
      navigate(Router_path.addProduct);
     });
     document.getElementById('task-item5').addEventListener('click', ()=>{
      Cookies.remove('Login');
      navigate(Router_path.root);
     });

    document.getElementById('header-user').innerHTML = result.userName + '(فروشنده)';
  }, 500);


  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    productNumber: '',
    image: null, // Initialize image as null
    filter: '',
    discount: '', // New field for discount
    features: [] // New state for features
  });
  
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (typeof index !== 'undefined') { // Check if index is defined
      const updatedFeatures = [...formData.features];
      updatedFeatures[index][name] = value;
      setFormData({
        ...formData,
        features: updatedFeatures
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  
  const handleAddFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, { name: '', value: '' }]
    });
  };
  
  const handleSubmit = async() => {
    // e.preventDefault();
    await save_image_to_disck();
    const { name, price, description, productNumber, image, filter, discount, features } = formData;

    token = Cookies.get('Login');
    let currSeller = await request.Post(Url.tokenValidator, { token: token });
    let userName1 = currSeller.userName;
    const product = new Product(null, name, price, description, productNumber, image, filter, discount, features, Product.status_available,
      userName1,0,0);
  

    let result = await request.Post(Url.addProduct_url, product);
    if(result === "ok"){
      navigate(Router_path.sellerAcount);
      alert("محصول با موفقیت اضافه شد");
    }else{
      alert("خطا در افزودن محصول")
    }

  };

  
  const handleImage = async(e) => { 
    const file = e.target.files[0]; 
    fileData_upload = new FormData(); 
    fileData_upload.append('file', file); 
 
   
 } 

 const save_image_to_disck = async()=>{
      const response = await fetch('http://localhost:9000/upload', { 
        method: 'POST', 
        body: fileData_upload 
    }); 

    if (response.ok) { 
      const data = await response.json();
      formData.image = data; 
    } else { 
        console.error('خطا در ارسال فایل.'); 
    } 
 }



  return (
    <div className="seller-account">
      <Taskbar tasks={tasks} />
      <div className="main-content">
        <div className="header headerSeller">
          <h1 id="header-user"></h1>
        </div>
        <div id='content-div' className="content">








        <div className="add-product-container">
      <div className="background"></div>
      <div className="info-message">
        <p>فروشنده عزیز لطفا از نماد مناسب برای فاصله استفاده کنید</p>
      </div>
      <h2>افزودن محصول</h2>
      <form id="register_form">
        <div className="form-group">
          <label>نام<span className="required">*</span>:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>قیمت<span className="required">*</span>:</label>
          <input type="text" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>توضیحات:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>تعداد محصول:</label>
          <input type="text" name="productNumber" value={formData.productNumber} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>عکس محصول:</label>
          <input type="file" name="image" onChange={handleImage} accept="image/*" />
        </div>
        <div className="form-group">
          <label>دسته بندی<span className="required">*</span>:</label>
          <select name="filter" value={formData.filter} onChange={handleChange} required>
          <option value="">انتخاب کنید</option>
          <option value="مواد غذایی">مواد غذایی</option> 
          <option value="مد و پوشاک">مد و پوشاک</option>
          <option value="ابزار آلات">ابزار آلات</option>
          <option value="آرایشی بهداشتی">آرایشی بهداشتی</option>
          <option value="اسباب بازی">اسباب بازی</option>
          <option value="لوازم تحریر">لوازم تحریر</option>
          <option value="موبایل">موبایل</option>
          <option value="ورزش و سفر">ورزش و سفر</option>
          <option value="پزشکی و سلامت">پزشکی و سلامت</option>

          </select>
        </div>
        <div className="form-group">
          <label>(اختیاری)تخفیف اولیه فروش:</label> {/* New field for discount */}
          <input type="text" name="discount" value={formData.discount} onChange={handleChange} />
        </div>
        {/* Render input fields for features */}
        {formData.features.map((feature, index) => (
          <div key={index} className="form-group">
            <label>ویژگی {index + 1}:</label>
            <input
              type="text"
              name="name"
              placeholder="نام ویژگی"
              value={feature.name}
              onChange={(e) => handleChange(e, index)}
            />
            <input
              type="text"
              name="value"
              placeholder="مقدار ویژگی"
              value={feature.value}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
        ))}
        {/* Button to add a new feature */}
        <button type="button" onClick={handleAddFeature}>افزودن ویژگی جدید</button>
        <div className="button-group">
          <button type="button" onClick={handleSubmit} className='submit-btn-add-product'>ثبت محصول</button>
        </div>
      </form>
    </div>









        </div>
      </div>
    </div>
  );
}


export default AddProduct;
