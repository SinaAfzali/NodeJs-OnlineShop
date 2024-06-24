import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/changeProduct.css'; // Import CSS file for styling
import Cookies from 'js-cookie';
import Router_path from '../utilities/routes';


const {Product} = require('../utilities/classes');
const request = require('../utilities/HTTP_REQUEST');
const Url = require('../utilities/urls');
var productData;
var fileData_upload = '';

const ChangeProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [change_image, setChangeImage] = useState(false);

  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    productNumber: '',
    image: null,
    filter: '',
    discount: '',
    features: [],
    currentImage: null,
    newImage: null
  });

  // Fetch product data based on ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Simulating fetching product data from API using the product ID
        productData = await request.Post(Url.getOneProduct_url, {product_id: String(id)});
        productData.image = await require('../images/productsImage/' + productData.image);

        // Update state with fetched product data
        setFormData((prevState) => ({
          ...prevState,
          name: productData.name || '',
          price: productData.price.toString() || '',
          description: productData.description || '',
          productNumber: productData.productNumber || '',
          currentImage: productData.image || null,
          filter: productData.filter || '',
          discount: productData.discount.toString() || '',
          features: productData.features || []
        }));
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle input change
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (typeof index !== 'undefined') { // Check if index is defined
      const updatedFeatures = [...formData.features];
      updatedFeatures[index][name] = value;
      setFormData((prevState) => ({
        ...prevState,
        features: updatedFeatures
      }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  // Handle image upload
  const handleImage = (e) => {
    const file = e.target.files[0]; 
    fileData_upload = new FormData(); 
    fileData_upload.append('file', file);
    setChangeImage(true);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    var { name, price, description, productNumber, image, filter, discount, features } = formData;
    if(change_image){
      let newImage = save_image_to_disck();
      image = newImage;
    }else {
      let currProduct = await request.Post(Url.getOneProduct_url, {product_id: String(id)});
      image = currProduct.image;
    }
    try {
      let token = Cookies.get('Login');
      let currSeller = await request.Post(Url.tokenValidator, { token: token });
      let userName1 = currSeller.userName;
      const product = new Product(String(id), name, price, description, productNumber, image, filter, discount, features, Product.status_dontdisplay,
        userName1,productData.total_scores,productData.number_scores);
      let update = await request.Post(Url.update_product, product);
      if(update){
        alert('محصول با موفقیت به روز رسانی شد ');
        navigate(Router_path.sellerAcount);
      }else{
        alert('خطایی رخ داده است')
      }
      
    } catch (error) {
      console.error('Error updating product:', error);
      alert('خطا در تغییر محصول');
    }
  };


  const save_image_to_disck = async()=>{
    const response = await fetch('http://localhost:9000/upload/productImage', { 
      method: 'POST', 
      body: fileData_upload 
  }); 

  if (response.ok) { 
    const data = await response.json();
    return data;
  } else { 
      console.error('خطا در ارسال فایل.'); 
  } 
}

  // Handle adding new feature
  const handleAddFeature = () => {
    setFormData((prevState) => ({
      ...prevState,
      features: [...prevState.features, { name: '', value: '' }]
    }));
  };

  const remove_feature = (index)=>{
    let newFeatures = [];
    for(let i=0;i<formData.features.length;i++){
      if(i !== index)newFeatures.push(formData.features[i]);
    }
    setFormData((prevState) => ({
      ...prevState,
      name: productData.name || '',
      price: productData.price.toString() || '',
      description: productData.description || '',
      productNumber: productData.productNumber || '',
      currentImage: productData.image || null,
      filter: productData.filter || '',
      discount: productData.discount.toString() || '',
      features: newFeatures || []
    }));
  }


  const remove_product = async()=>{
    let deleted = await request.Post(Url.delete_product_url, {_id: id});
    if (deleted){
      alert('محصول با موفقیت حذف شد ');
      navigate(Router_path.sellerAcount);
    }else alert('خطایی در حذف محصول رخ داده است ');
  }




  return (
    <div className="add-product-container">
      <h2>تغییر محصول</h2>
      <button type="button" className="remove-btn-cart" onClick={remove_product}>حذف محصول</button>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>نام:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>قیمت:</label>
          <input type="text" name="price" value={formData.price} onChange={handleChange} />
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
          <label>عکس فعلی محصول:</label>
          {formData.currentImage && <img src={formData.currentImage} alt="Current Product" className="current-image" />}
          <input type="file" name="image" onChange={handleImage} />
          {formData.newImage && <img src={formData.newImage} alt="New Product" className="new-image" />}
        </div>
        <div className="form-group">
          <label>دسته بندی:</label>
          <select name="filter" value={formData.filter} onChange={handleChange}>
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
          <label>تخفیف:</label>
          <input type="text" name="discount" value={formData.discount} onChange={handleChange} />
        </div>
        {/* Render input fields for features */}
        {formData.features.map((feature, index) => (
          <div key={index} className="form-group">
            <label>ویژگی {index + 1}:</label>
            <button type="button" className='remove-feature' onClick={()=>remove_feature(index)}>حذف ویژگی</button>
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
          <button type="submit" className="submit-btn-add-product">ثبت تغییرات</button>
        </div>
      </form>
    </div>
  );
};

export default ChangeProduct;
