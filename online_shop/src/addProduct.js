import React, { useState } from 'react';
import './css/addProduct.css'; // Import CSS file for styling
const {addProduct} = require('./addProductURL');

function AddProduct({ onAddProduct, onBack }) {

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // onAddProduct(formData);
    addProduct(formData);
  };

  return (
    <div className="add-product-container">
      <div className="background"></div>
      <div className="info-message">
        <p>فروشنده عزیز لطفا از نماد مناسب برای فاصله استفاده کنید</p>
      </div>
      <h2>افزودن محصول</h2>
      <form id="register_form" onSubmit={handleSubmit}>
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
          <button type="button" onClick={onBack} className="red-button">Back</button>
          <button type="submit">Confirm</button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
