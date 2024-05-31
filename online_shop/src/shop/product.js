import React from 'react';
import '../css/product.css'; // Create this CSS file for product card styles

const ProductCard = ({ image, name, price, description }) => {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <h3 className="product-name">{name}</h3>
      <p className="product-price">{price}</p>
      <p className="product-description">{description}</p>
    </div>
  );
};

export default ProductCard;
