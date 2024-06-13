import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { request, Url } from '../utilities/HTTP_REQUEST';
import '../css/changeProduct.css'; // Import CSS file for styling

const ChangeProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    productNumber: '',
    image: null,
    filter: '',
    discount: '',
    features: []
  });

  // Fetch product data based on ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Simulating fetching product data from API using the product ID
        const productData = {
          _id: '1',
          name: 'Product 1',
          description: 'Description of Product 1',
          price: 10000,
          discount: 10,
          total_scores: 50,
          number_scores: 10,
          image: require('../images/sample-product.png')
        };

        // Update state with fetched product data
        setFormData({
          name: productData.name || '',
          price: productData.price.toString() || '',
          description: productData.description || '',
          productNumber: productData.productNumber || '',
          image: productData.image || null,
          filter: productData.filter || '',
          discount: productData.discount.toString() || '',
          features: [] // Assuming no features initially
        });
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data based on input name
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const { name, price, description, productNumber, image, filter, discount, features } = formData;

    try {
      const updatedProduct = {
        id,
        name,
        price: parseInt(price, 10),
        description,
        productNumber,
        image,
        filter,
        discount: parseInt(discount, 10),
        features
      };

      // Simulate API call to update product
      console.log('Updated Product:', updatedProduct);
      alert('محصول با موفقیت تغییر یافت');
      navigate('/sellerAccount'); // Redirect to seller account page after successful update
    } catch (error) {
      console.error('Error updating product:', error);
      alert('خطا در تغییر محصول');
    }
  };

  // Handle adding new feature (assuming feature management)
  const handleAddFeature = () => {
    // Add logic to manage features if needed
  };

  return (
    <div className="add-product-container">
      <h2>تغییر محصول</h2>
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
          <label>عکس محصول:</label>
          <input type="file" name="image" onChange={handleImage} />
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
        {/* Features handling */}
        {/* You can add logic here to manage features dynamically */}
        <button type="button" onClick={handleAddFeature}>افزودن ویژگی جدید</button>
        <div className="button-group">
          <button type="submit" className="submit-btn-add-product">ثبت تغییرات</button>
        </div>
      </form>
    </div>
  );
};

export default ChangeProduct;
