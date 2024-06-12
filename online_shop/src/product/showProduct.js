import React, { useState , useEffect} from 'react';
import { useParams } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
import '../css/showProduct.css';
import {money_standard, getCookie, update_cookie, update_cart_cookie, checkCharacterOrder} from '../utilities/functions';
import Cookies from 'js-cookie';


const request = require('../utilities/HTTP_REQUEST');
const Url = require('../utilities/urls');


var product;

var currentProduct;

var commentLength = 0;

const ShowProduct = () => {
  const [userRating, setUserRating] = useState(null);
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const [nameComment, setnameComment] = useState('');
  const [textComment, settextComment] = useState('');
  const { id } = useParams(); 
 

  useEffect(()=>{
   const sendRequest = async()=>{
    product = await request.Post(Url.getOneProduct_url, {product_id: String(id)});
    let score;
    if(product.number_scores !== 0){
      score =  '('+ product.Scorers.length +') ' +  (product.total_scores / product.number_scores).toFixed(1) + '★';
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
    if(cookieValue && checkCharacterOrder(',', cookieValue)){
     let product_split = cookieValue.split(',');
     for(let i=0;i<product_split.length;i+=2){
       if(String(id) === product_split[i]){
         document.getElementById('increase-cart-show-product').style.display = 'block';
         document.getElementById('add-cart-show-product').style.display = 'none';
         document.getElementById('number-product-in-cart').innerHTML = "تعداد در سبد خرید : " + product_split[i+1];
       }
     }
    }
   }, 200);


   setTimeout(async() => {
     let comments = await request.Post(Url.get_comments, {product_id: id});
     let html = '';
     let colors = ['red', 'blue', 'green', 'blueviolet', 'chocolate' , 'darkgrey', 'gold', 'pink', 'orange', 'mediumturquoise'];
     if(comments.length !== 0 && comments.length !== commentLength){
      commentLength = comments.length;
      document.getElementById('comments-list').innerHTML = '<h1>نظرات کاربران</h1><p>هیچ نظری برای این محصول ثبت نشده است</p>';
          for(let i=0;i<comments.length;i++){
        html += `  <div id='comment-show${i}'>
        <div id='comment-title${i}'>
          <div id='comment-title-char${i}'>${comments[i].name[0]}</div>
          <div id='comment-title-name${i}'>${comments[i].name}</div>
          <div id='comment-title-date${i}'>${comments[i].date_add.substring(10,16)}</div>
          <div>${comments[i].date_add.substring(0,10)}</div>
        </div>
        <div id='comment-text${i}'>${comments[i].text}</div>
      </div>`;
      }
      document.getElementById('comments-list').innerHTML = ' <h1>نظرات کاربران</h1>' +  html;
      for(let i=0;i<comments.length;i++){
        document.getElementById('comment-show'+i).className = 'comment-show';
        document.getElementById('comment-title'+i).className = 'comment-title';
        document.getElementById('comment-title-char'+i).className = 'comment-title-char';
        document.getElementById('comment-title-char'+i).style.backgroundColor = colors[Math.floor(Math.random() * 10)];
        document.getElementById('comment-title-name'+i).className = 'comment-title-name';
        document.getElementById('comment-title-date'+i).className = 'comment-title-date';
        document.getElementById('comment-text'+i).className = 'comment-text';
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
      if(String(id) !== product_split[i] && i !== product_split.length - 2){
        cookieValue += product_split[i] + ',' + product_split[i+1] + ',';
      }
      else if(String(id) !== product_split[i] && i === product_split.length - 2)cookieValue += product_split[i] + ',' + product_split[i+1];
      if(String(id) === product_split[i] && i === product_split.length - 2 && product_split.length > 2){
        cookieValue = cookieValue.substring(0,cookieValue.length-1);
      }
    }
    update_cookie('cart', cookieValue, 0);
  }
  const add = async()=>{
    let cookieValue = getCookie('cart');
    if(cookieValue){
      cookieValue += ',' + String(id) + ',1'
    }else cookieValue = String(id) + ',1';
    update_cookie('cart', cookieValue, 0);
    document.getElementById('increase-cart-show-product').style.display = 'block';
    document.getElementById('add-cart-show-product').style.display = 'none';
    document.getElementById('number-product-in-cart').innerHTML = "تعداد در سبد خرید : " + 1;
  }

  const plus = async()=>{
    let number = update_cart_cookie(id, 'plus', Number(product.productNumber));
    document.getElementById('number-product-in-cart').innerHTML = "تعداد در سبد خرید : " + number;
    }

  const minus = ()=>{
    let number = update_cart_cookie(id, 'minus' , 0);
    document.getElementById('number-product-in-cart').innerHTML = "تعداد در سبد خرید : " + number;
  }






  const handleRatingChange = (e) => {
    setUserRating(Number(e.target.value));
  };

  const handleSubmitRating = async() => {
    if (userRating) {
      let token = Cookies.get('Login');
      if(token){
        let user = await request.Post(Url.tokenValidator, { token: token });
        if(user.role === 'seller')alert('شما به عنوان فروشنده لاگین کرده اید \n بنابراین نمیتوانید امتیاز دهید');
        else{
          let result = await request.Post(Url.check_rating, {userName: user.userName, product_id : id});
          if (result) {
            let result = await request.Post(Url.submit_rating, {userName: user.userName, product_id : id, score: userRating});
            if(result){
              alert('امتیاز شما با موفقیت ثبت شد')
            }else{
              alert('شما قبلا به این محصول امتباز داده اید');
            }
            
          }else{
            alert('شما این محصول را خریداری نکرده اید \n بنابراین نمیتوانید به آن امتیاز دهید')
          }

        }
      }else{
        alert("ابتدا باید وارد حساب کاربری خود شوید");
      }

    }
  };

  const toggleImageSize = () => {
    setIsImageEnlarged(!isImageEnlarged);
  };

  const navigate = useNavigate();
  const handleBottomButtonClick = () => {
    navigate('/');
  };


  const changeNameComment = (e)=>{
    setnameComment(e.target.value);
  }

  const changeTextAreaComment = (e)=>{
    settextComment(e.target.value);
  }

  const submitComment = async()=>{
    if(nameComment.length < 2 )alert('نام باید حداقل شامل 3 کاراکتر باشد');
    else if(textComment.length < 5)alert('نظر شما باید حداقل شامل 5 کاراکتر باشد');
    else{
      let comment = await request.Post(Url.add_comment, {product_id: id, name: nameComment, text: textComment});
      if(comment){
        alert('نظر شما با موفقیت ثبت شد');
        setnameComment('');
        settextComment('');
        document.getElementById('inputecomment').value = '';
        document.getElementById('textareacomment').value = '';
      }
    }

  }





  return (
    <div className="product-detail-page">
       <button className="top-left-button" onClick={handleBottomButtonClick}>صفحه اصلی</button>
      <div className="show-product-card">
      <p className='space-p'>-------------------------------------------------------------------------------------</p>
        <h1 id='product-name' className="show-product-name"></h1>
        <img id='product-image'
          src=''
          alt=''
          className={`show-product-image ${isImageEnlarged ? 'enlarged' : ''}`}
          onClick={toggleImageSize}
        />
        <div className="show-price-rating">
          <p id='product-price'  className="show-product-price"></p>
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
        <div id='product-rating' className="show-product-rating"></div>
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
        <div className='comment-section'>


        <h1>نظر خود را بنویسید</h1>
        <div className="form-group">
          <input id='inputecomment' type="text" onChange={(e)=>changeNameComment(e)} placeholder='نام خود را وارد کنید'/>
          <textarea id='textareacomment' className='textarea-comments' onChange={(e)=>changeTextAreaComment(e)} placeholder='نظر خود را بنویسید ...'/>
          <button onClick={submitComment}>ثبت نظر</button>

         
          <div id='comments-list' className='comments-list'>
           <h1>نظرات کاربران</h1>
           <p>هیچ نظری برای این محصول ثبت نشده است</p>
          </div>


        </div>
      </div>
      </div>
    </div>
  );
};
export default ShowProduct;
