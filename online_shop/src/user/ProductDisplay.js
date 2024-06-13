import React, { useState, useEffect } from 'react';
import '../css/productDisplay.css';
import { useNavigate } from 'react-router-dom';
import { money_standard } from '../utilities/functions';
import Cookies from 'js-cookie';

const request = require('../utilities/HTTP_REQUEST');
const Url = require('../utilities/urls'); 


let token = Cookies.get('Login');
let current_user = await request.Post(Url.tokenValidator, { token: token });

const ProductDisplay = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let filtered_products;
    const fetchProducts = async () => {
      // Sample product data
       filtered_products = await request.Post(Url.getSellerProducts, {userName: current_user.userName});
      for(let i=0;i<filtered_products.length;i++){
        filtered_products[i].image = require('../images/productsImage/' + filtered_products[i].image);
      }
      setProducts(filtered_products);
    };

    fetchProducts();
    setTimeout(() => {
      for(let i=0;i<filtered_products.length;i++){
        let score = '';
          if(filtered_products[i].number_scores > 0)score = filtered_products[i].total_scores/filtered_products[i].number_scores;
          if(score !== ''){
            score = score.toFixed(1);
            document.getElementById('product-point-disply' + String(i)).innerHTML = score + '☆';
          }else document.getElementById('product-point-disply' + String(i)).style.backgroundColor = 'white';
    
          if(filtered_products[i].discount > 0 && filtered_products[i].discount <= 100){
            document.getElementById('product-discount-disply' + String(i)).innerHTML = filtered_products[i].discount + '%';
          }else document.getElementById('product-discount-disply' + String(i)).style.backgroundColor = 'white';
      }
      console.log(filtered_products.length);
    }, 500);
  }, []);

  return (
    <div className="product-panel-disply">
      <h2>محصولات</h2>
      <div id='product-list' className="product-list-disply">
        {products.map((product, index) => (
          <div key={product._id} id={`product-item${product._id}`} className="product-item-disply">
            <img src={product.image} alt={product.name} id={`image${index}`} className="product-image" />
            <p id={`product-name${index}`} className="product-name">{product.name}</p>
            <div id={`product-rating${index}`} className="product-rating">
              <div id={`product-point-disply${index}`} className="product-point">{product.number_scores > 0 ? (product.total_scores / product.number_scores).toFixed(1) + '☆' : ''}</div>
              <div id={`product-discount-disply${index}`} className="product-discount">{product.discount > 0 && product.discount <= 100 ? product.discount + '%' : ''}</div>
            </div>
            <p id={`product-price${index}`} className="product-price">{money_standard(((100 - product.discount) * product.price / 100).toFixed(0))} تومان </p>
            <button className='button-disply' onClick={() => navigate(`/showProduct/${product._id}`)}>مشاهده</button>
            <button className='button-disply' onClick={() => navigate(`/changeProduct/${product._id}`)}>ویرایش</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDisplay;
