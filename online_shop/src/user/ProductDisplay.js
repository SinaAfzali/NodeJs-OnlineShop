import React, { useState, useEffect } from 'react';
import '../css/productDisplay.css';
import { useNavigate } from 'react-router-dom';
import { money_standard } from '../utilities/functions';

const ProductDisplay = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      // Sample product data
      const sampleProducts = [
        {
          _id: '1',
          name: 'Product 1',
          description: 'Description of Product 1',
          price: 10000,
          discount: 10,
          total_scores: 50,
          number_scores: 10,
          image: require('../images/sample-product.png')
        },
        {
          _id: '2',
          name: 'Product 2',
          description: 'Description of Product 2',
          price: 20000,
          discount: 15,
          total_scores: 40,
          number_scores: 8,
          image: require('../images/sample-product.png')
        },
        {
          _id: '3',
          name: 'Product 3',
          description: 'Description of Product 3',
          price: 30000,
          discount: 5,
          total_scores: 30,
          number_scores: 6,
          image: require('../images/sample-product.png')
        }
      ];
      setProducts(sampleProducts);
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-panel">
      <h2>محصولات</h2>
      <div id='product-list' className="product-list">
        {products.map((product, index) => (
          <div key={product._id} id={`product-item${product._id}`} className="product-item">
            <img src={product.image} alt={product.name} id={`image${index}`} className="product-image" />
            <p id={`product-name${index}`} className="product-name">{product.name}</p>
            <div id={`product-rating${index}`} className="product-rating">
              <div id={`product-point${index}`} className="product-point">{product.number_scores > 0 ? (product.total_scores / product.number_scores).toFixed(1) + '☆' : ''}</div>
              <div id={`product-discount${index}`} className="product-discount">{product.discount > 0 && product.discount <= 100 ? product.discount + '%' : ''}</div>
            </div>
            <p id={`product-price${index}`} className="product-price">{money_standard(((100 - product.discount) * product.price / 100).toFixed(0))} تومان </p>
            <button onClick={() => navigate(`/showProduct/${product._id}`)}>مشاهده محصول</button>
            <button onClick={() => navigate(`/changeProduct/${product._id}`)}>تغییر محصول</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDisplay;
