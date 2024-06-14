import React, { useState, useEffect } from 'react';
import '../css/productDisplay.css';
import { useNavigate } from 'react-router-dom';
import { money_standard } from '../utilities/functions';
import Cookies from 'js-cookie';
import { Product } from '../utilities/classes';

const request = require('../utilities/HTTP_REQUEST');
const Url = require('../utilities/urls'); 


let token = Cookies.get('Login');
let current_user = await request.Post(Url.tokenValidator, { token: token });

const ProductDisplay = ({ searchQuery , filter}) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let filtered_products;
    const fetchProducts = async () => {
      token = Cookies.get('Login');
      current_user = await request.Post(Url.tokenValidator, { token: token });
      // Sample product data
      if(filter){
        filtered_products = await request.Post(Url.getSellerProducts, {userName: current_user.userName});
      }else{
        filtered_products = await request.Post(Url.getFilterdProducts_url, {filter1: 'همه محصولات', filter2: ''})
      }
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



        let this_tag = document.getElementById('product-status' + filtered_products[i]._id);
        this_tag.innerHTML = filtered_products[i].status;
        if(this_tag.innerHTML === Product.status_dontdisplay){
          this_tag.style.backgroundColor = 'red';
          this_tag.style.marginRight = '40px';
        }else{
           this_tag.style.backgroundColor = 'green';
           this_tag.style.marginRight = '60px';
        }
        if(current_user.position !== 'SuperAdmin')this_tag.style.display = 'none';
        }
    }, 100);
  }, []);


  const changeStatus = async(id)=>{
    let this_tag = document.getElementById('product-status' + id);
    if(this_tag.innerHTML === 'موجود'){
      this_tag.innerHTML = 'عدم نمایش';
      this_tag.style.backgroundColor = 'red';
      this_tag.style.marginRight = '40px';
      await request.Post(Url.change_status_product, {status:Product.status_dontdisplay, product_id:id});
    }else{
       this_tag.innerHTML = 'موجود';
       this_tag.style.backgroundColor = 'green';
       this_tag.style.marginRight = '60px';
       await request.Post(Url.change_status_product, {status:Product.status_available, product_id:id});
    }
    
  }

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
            <button id={`product-status${product._id}`} className='button-disply button-disply2' onClick={()=>changeStatus(product._id)}>موجود</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDisplay;
