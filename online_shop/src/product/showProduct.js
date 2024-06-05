import React, { useState , useEffect} from 'react';
import { useParams } from 'react-router-dom'; 
import '../css/showProduct.css';
import {money_standard, getCookie, update_cookie, update_cart_cookie} from '../utilities/functions';


const request = require('../utilities/HTTP_REQUEST');
const Url = require('../utilities/urls');

var number_product_in_cart = 0;

var product;

var currentProduct;

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {Array.from({ length: fullStars }, (_, index) => (
        <span key={`full-${index}`} className="star full">★</span>
      ))}
      {halfStar && <span className="star half">☆</span>}
      {Array.from({ length: emptyStars }, (_, index) => (
        <span key={`empty-${index}`} className="star empty">☆</span>
      ))}
    </>
  );
};

const ShowProduct = () => {
  const [userRating, setUserRating] = useState(null);
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const { id } = useParams(); 
 

  useEffect(()=>{
   const sendRequest = async()=>{
    product = await request.Post(Url.getOneProduct_url, {product_id: String(id)});
    let score;
    if(product.number_scores !== 0){
      score = (product.total_scores / product.number_scores).toFixed(1);
    }else score = '';
    let price = money_standard((product.price * (100 - product.discount)) / 100);
    currentProduct = {
      name: product.name,
      score: score,
      description: product.description,
      image: product.image,
      price: price,
    }
    document.getElementById('product-image').src = require('../images/productsImage/' + String(currentProduct.image));
    document.getElementById('product-name').innerHTML = currentProduct.name;
    document.getElementById('product-description').innerHTML = currentProduct.description;
    document.getElementById('product-rating').innerHTML = currentProduct.score;
    document.getElementById('product-price').innerHTML = currentProduct.price + ' تومان ';
    let html = '<div id="title-moreinfo"> مشخصات فنی </div><div></div><div></div>';
    for(let i=0;i<product.features.length;i++){
      html += `<p>${product.features[i].name} : </p>
      <p>${product.features[i].value}</p><p></p>
      `
    }
    document.getElementById('product-features').innerHTML = html;
    document.getElementById('title-moreinfo').style.marginBottom = '20px';
   }
   sendRequest();
   setTimeout(() => {
    let cookieValue = getCookie('cart');
    if(cookieValue){
     let product_split = cookieValue.split(',');
     for(let i=0;i<product_split.length;i+=2){
       if(String(product._id) === product_split[i]){
         document.getElementById('increase-cart-show-product').style.display = 'block';
         document.getElementById('add-cart-show-product').style.display = 'none';
         document.getElementById('number-product-in-cart').innerHTML = "تعداد در سبد خرید : " + product_split[i+1];
       }
     }
    }
   }, 200);
  });



  const remove = async()=>{
    document.getElementById('increase-cart-show-product').style.display = 'none';
    document.getElementById('add-cart-show-product').style.display = 'block';
    document.getElementById('number-product-in-cart').innerHTML = "تعداد در سبد خرید : " + 0;
    let cookieValue = getCookie('cart');
    let product_split = cookieValue.split(',');
    cookieValue = '';
    for(let i=0;i<product_split.length;i+=2){
      if(String(product._id) !== product_split[i] && i !== product_split.length - 2){
        cookieValue += product_split[i] + ',' + product_split[i+1] + ',';
      }
      else if(String(product._id) !== product_split[i] && i === product_split.length - 2)cookieValue += product_split[i] + ',' + product_split[i+1];
      if(String(product._id) === product_split[i] && i === product_split.length - 2){
        cookieValue = cookieValue.substring(0,cookieValue.length-1);
      }
    }
    update_cookie('cart', cookieValue, 0);
  }
  const add = async()=>{
    let cookieValue = getCookie('cart');
    if(cookieValue){
      cookieValue += ',' + String(product._id) + ',1'
    }else cookieValue = String(product._id) + ',1';
    update_cookie('cart', cookieValue, 0);
    document.getElementById('increase-cart-show-product').style.display = 'block';
    document.getElementById('add-cart-show-product').style.display = 'none';
    document.getElementById('number-product-in-cart').innerHTML = "تعداد در سبد خرید : " + 1;
  }

  const plus = async()=>{
    let number = update_cart_cookie(product._id, 'plus', Number(product.productNumber));
    document.getElementById('number-product-in-cart').innerHTML = "تعداد در سبد خرید : " + number;
    }

  const minus = ()=>{
    let number = update_cart_cookie(product._id, 'minus' , 0);
    document.getElementById('number-product-in-cart').innerHTML = "تعداد در سبد خرید : " + number;
  }






  const handleRatingChange = (e) => {
    setUserRating(Number(e.target.value));
  };

  const handleSubmitRating = () => {
    if (userRating) {
      alert(`You rated this product: ${userRating} stars`);
      // Update the displayed rating stars
      currentProduct.rate = userRating;
    }
  };

  const toggleImageSize = () => {
    setIsImageEnlarged(!isImageEnlarged);
  };

  return (
    <div className="product-detail-page">
      <div className="show-product-card">
        <h1 id='product-name' className="show-product-name"></h1>
        <img id='product-image'
          src=''
          alt=''
          className={`show-product-image ${isImageEnlarged ? 'enlarged' : ''}`}
          onClick={toggleImageSize}
        />
        <div className="show-price-rating">
          <p id='product-price'  className="show-product-price"></p>
          <div id='product-rating' className="show-product-rating"></div>
        </div>
        <div id='increase-cart-show-product' className='increase-cart-show-product'>
           <h2 id='number-product-in-cart'>تعداد در سبد خرید : 1</h2>
           <button className='quantity-btn-cart' onClick={plus}>+</button>
           <button className='quantity-btn-cart' onClick={minus}>-</button>
           <button className='remove-btn-cart' onClick={remove}>حذف محصول</button>
        </div>
        <div id='add-cart-show-product' onClick={add}>
        <button className='add-product-to-cart'>افزودن به سبد خرید</button>
        </div>
        <p id='product-description' className="show-product-description"></p>
        <div id='product-features' className="product-odd-information"></div>
        <div className="user-rating">
          <p>امتیاز دهید:</p>
          <div className="rating-options">
            {[1, 2, 3, 4, 5].map((star) => (
              <label key={star} className={userRating === star ? 'selected' : ''}>
                <input
                  type="radio"
                  name="rating"
                  value={star}
                  onChange={handleRatingChange}
                />
                {star} ★
              </label>
            ))}
          </div>
          <button onClick={handleSubmitRating} className="submit-rating">ثبت امتیاز</button>
          {userRating && <p className="selected-rating">امتیاز انتخاب شده : {userRating} ستاره</p>}
        </div>
      </div>
    </div>
  );
};
export default ShowProduct;
