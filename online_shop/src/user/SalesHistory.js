import React, { useState, useEffect } from 'react';
import '../css/SalesHistory.css'; // Import CSS file for styling
import { money_standard, check_login } from '../utilities/functions';
import Cookies from 'js-cookie';


const request = require('../utilities/HTTP_REQUEST');
const Url = require('../utilities/urls'); 

let current_user = check_login();

const SalesHistory = ({filter}) => {
  const [salesData, setSalesData] = useState([]);

  useEffect(()=>{
    setTimeout(async() => {
      current_user = await check_login();
      let transactions;
      if(filter)transactions = await request.Post(Url.get_Transaction_seller, {userName: current_user.userName, position: 'Member'});
      else transactions = await request.Post(Url.get_Transaction_seller, {userName: current_user.userName, position: 'SuperAdmin'});;
      setSalesData(transactions);
    }, 100);
  })


  const handleViewMore = (sale) => {
        let moreDiv = document.getElementById('more-details'+sale._id);
        let moreBtn = document.getElementById('more-btn'+sale._id);
        if(moreBtn.innerHTML === 'جزئیات بیشتر'){
          moreBtn.innerHTML = 'جزئیات کمتر';
          moreDiv.style.display = 'block';
        }else{
          moreBtn.innerHTML = 'جزئیات بیشتر';
          moreDiv.style.display = 'none';
        }
  };

  return (
    <div className="sales-history">
      <h2>تاریخچه فروش</h2>
      <div className="sales-list">
        {salesData.map((sale) => (
          <div key={sale._id} className="sale-item">
            <div className="sale-info">
              <p className="price">مبلغ فاکتور : {money_standard(sale.total_price)} تومان</p>
              <p className="date">تاریخ: {sale.date_paid.substring(10,16) + ' ' + sale.date_paid.substring(0,10)}</p>
              <p className="date">خریدار: {sale.customer_id}</p>
              <p id='receipt-number' className="receipt-number">کدپیگیری : {sale._id}</p>
              <p className="count">تعداد محصولات: {sale.products_list.length}</p>
            </div>
            <div className='more-datails-div' id={`more-details${sale._id}`}><p>محصولات فروخته شده : </p><p></p>
            {sale.products_list.map((product, index)=>(
              <div>
              <p className='p-sales-history'>محصول شماره {index+1} : </p>
              <a className='a-sales-history' href={`/showProduct/${product.product_id}`}> آیدی : {product.product_id} </a>
              <p>نام محصول : {product.name}</p>
              <p>تعداد خریداری شده : {product.number}</p>
              <p>قیمت هر واحد : {money_standard(product.price)} تومان</p>
              </div>
            ))}
            </div>
            <button className='button-sales' id={`more-btn${sale._id}`} onClick={() => handleViewMore(sale)}>
            جزئیات بیشتر
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesHistory;
