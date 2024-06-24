import React, { useState, useEffect } from 'react';
import '../css/SalesHistory.css'; // Import CSS file for styling
import { money_standard } from '../utilities/functions';
import Cookies from 'js-cookie';


const request = require('../utilities/HTTP_REQUEST');
const Url = require('../utilities/urls'); 


let token = Cookies.get('Login');
let current_user = await request.Post(Url.tokenValidator, { token: token });
let current_transactions = []

const SalesHistory = () => {
  const [salesData, setSalesData] = useState([]);



  useEffect(()=>{
    setTimeout(async() => {
      token = Cookies.get('Login');
      current_user = await request.Post(Url.tokenValidator, { token: token });
      let transactions = await request.Post(Url.get_Transaction_customer, {userName: current_user.userName});
      current_transactions = []
      setSalesData([]);
      for(let i=0;i<transactions.length;i++){
        current_transactions.push({
          id: transactions[i]._id,
          price: transactions[i].total_price,
          date: transactions[i].date_paid.substring(10,16) + ' ' + transactions[i].date_paid.substring(0,10),
          receiptNumber: transactions[i]._id,
          count:transactions[i].products_list.length,
          products_list: transactions[i].products_list,
          customer:transactions[i].customer_id
        })
      }
      setSalesData(current_transactions);
    }, 100);
  })

  

  const handleViewMore = (sale) => {
    let moreDiv = document.getElementById('more-details'+sale.id);
    let moreBtn = document.getElementById('more-btn'+sale.id);
    if(moreBtn.innerHTML === 'جزئیات بیشتر'){
      moreDiv.innerHTML = `<p>محصولات خریداری شده : </p><p></p>`;
      for(let j=0;j<sale.products_list.length;j++){
        moreDiv.innerHTML += `<p style='color:red;'>محصول شماره ${j+1} : </p>`;
        moreDiv.innerHTML += `<a style='text-decoration:none;color:blue;' href='/showProduct/${sale.products_list[j].product_id}'> آیدی : ${sale.products_list[j].product_id} </a>`;
        moreDiv.innerHTML += `<p>نام محصول : ${sale.products_list[j].name}</p>`;
        moreDiv.innerHTML += `<p>تعداد خریداری شده : ${sale.products_list[j].number}</p>`;
        moreDiv.innerHTML += `<p>قیمت هر واحد : ${money_standard(sale.products_list[j].price)} تومان</p>`
      }
      moreBtn.innerHTML = 'جزئیات کمتر';
      moreDiv.style.display = 'block';
    }else{
      moreBtn.innerHTML = 'جزئیات بیشتر';
      moreDiv.style.display = 'none';
    }
  };

  return (
    <div className="sales-history">
      <h2>تاریخچه خرید</h2>
      <div className="sales-list">
        {salesData.map((sale) => (
          <div key={sale.id} className="sale-item">
            <div className="sale-info">
              <p className="price">مبلغ فاکتور : {money_standard(sale.price)} تومان</p>
              <p className="date">تاریخ: {sale.date}</p>
              <p id='receipt-number' className="receipt-number">کدپیگیری : {sale.receiptNumber}</p>
              <p className="count">تعداد محصولات: {sale.count}</p>
            </div>
            <div className='more-datails-div' id={`more-details${sale.id}`}><p>محصولات خریداری شده : </p><p></p></div>
            <button className='button-sales' id={`more-btn${sale.id}`} onClick={() => handleViewMore(sale)}>
            جزئیات بیشتر
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesHistory;
