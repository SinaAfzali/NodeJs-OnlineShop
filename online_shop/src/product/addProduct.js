import Cookies from 'js-cookie';
import React, { useState } from 'react';
import '../css/sellerAccount.css';
import { useNavigate } from 'react-router-dom';
import Router_path from '../utilities/routes';
const request = require('../utilities/HTTP_REQUEST');
const Url = require('../utilities/urls');
const {Product, } = require('../utilities/classes');



// get userName and role from cookie
let token = Cookies.get('Login');
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




function AddProduct() {


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
  
  const handleSubmit = () => {
    // e.preventDefault();
    const { name, price, description, productNumber, image, filter, discount, features } = formData;
  
    var productFeatures = "";
    for (let i = 0; i < features.length; i++) {
      productFeatures += features[i].name + "||" + features[i].value 
      if(i !== features.length-1)productFeatures+='||';
    }
  
    const product = new Product(name, price, description, productNumber, image, filter, discount, productFeatures);
  
    request.Post(Url.addProduct_url, product);
  };






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
          <input type="file" name="image" onChange={handleChange} accept="image/*" />
        </div>
        <div className="form-group">
          <label>دسته بندی<span className="required">*</span>:</label>
          <select name="filter" value={formData.filter} onChange={handleChange} required>
            <option value="">انتخاب کنید</option>
            <option value="موبایل">موبایل</option>
            <option value="لوازم تحریر">لوازم تحریر</option>
            <option value="کالا های سوپرمارکتی">کالا های سوپرمارکتی</option>
            <option value="اسباب بازی">اسباب بازی</option>
            <option value="آرایشی بهداشتی">آرایشی بهداشتی</option>
            <option value="مد و پوشاک">مد و پوشاک</option>
            <option value="ورزش و سفر">ورزش و سفر</option>
            <option value="ابزار آلات و تجهیزات">ابزار آلات و تجهیزات</option>
            <option value="تجهیزات پزشکی و سلامت">تجهیزات پزشکی و سلامت</option>
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
