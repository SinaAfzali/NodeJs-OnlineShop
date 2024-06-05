import React, { useState , useEffect} from 'react';
import { useParams } from 'react-router-dom'; 
import '../css/showProduct.css';
import { money_standard } from '../utilities/functions';


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
    currentProduct = {
      name: product.name,
      score: score,
      description: product.description,
      image: product.image,
      price: money_standard(product.price),
    }
    console.log(product.features);
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
  });



  const remove = ()=>{
    document.getElementById('increase-cart-show-product').style.display = 'none';
    document.getElementById('add-cart-show-product').style.display = 'block';
    number_product_in_cart = 0;
    document.getElementById('number-product-in-cart').innerHTML = "تعداد در سبد خرید : " + number_product_in_cart;
  }
  const add = ()=>{
    document.getElementById('increase-cart-show-product').style.display = 'block';
    document.getElementById('add-cart-show-product').style.display = 'none';
    number_product_in_cart = 1;
    document.getElementById('number-product-in-cart').innerHTML = "تعداد در سبد خرید : " + number_product_in_cart;
  }
  const plus = async()=>{
    product = await request.Post(Url.getOneProduct_url, {product_id: String(id)});
    if(product.productNumber > number_product_in_cart){
    number_product_in_cart++;
    document.getElementById('number-product-in-cart').innerHTML = "تعداد در سبد خرید : " + number_product_in_cart;
    }
  }
  const minus = ()=>{
    if(number_product_in_cart > 1){
      number_product_in_cart--;
      document.getElementById('number-product-in-cart').innerHTML = "تعداد در سبد خرید : " + number_product_in_cart;
    }
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
           <button className='quantity-btn' onClick={plus}>+</button>
           <button className='quantity-btn' onClick={minus}>-</button>
           <button className='remove-btn' onClick={remove}>حذف محصول</button>
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
