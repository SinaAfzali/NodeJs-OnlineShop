import React, { useState, useEffect } from 'react';
import '../css/SalesHistory.css'; // Import CSS file for styling
import { money_standard } from '../utilities/functions';
import Cookies from 'js-cookie';


const request = require('../utilities/HTTP_REQUEST');
const Url = require('../utilities/urls'); 


let token = Cookies.get('Login');
let current_user = await request.Post(Url.tokenValidator, { token: token });

const SalesHistory = () => {
  const [salesData, setSalesData] = useState([]);


  useEffect(()=>{
    setTimeout(async() => {
      let transactions = await request.Post(Url.get_Transaction_seller, {userName: current_user.userName});
      let current_transactions = []
      setSalesData([]);
      for(let i=0;i<transactions.length;i++){
        current_transactions.push({
          id: transactions[i]._id,
          price: transactions[i].total_price,
          date: transactions[i].date_paid.substring(10,16) + ' ' + transactions[i].date_paid.substring(0,10),
          receiptNumber: transactions[i]._id,
          count:transactions[i].products_list.length,
        })
      }
      setSalesData(current_transactions);
    }, 500);
  })


  const handleViewMore = (saleId) => {
  };

  return (
    <div className="sales-history">
      <h2>تاریخچه فروش</h2>
      <div className="sales-list">
        {salesData.map((sale) => (
          <div key={sale.id} className="sale-item">
            <div className="sale-info">
              <p className="price">مبلغ فاکتور : {money_standard(sale.price)} تومان</p>
              <p className="date">تاریخ: {sale.date}</p>
              <p id='receipt-number' className="receipt-number">کدپیگیری : {sale.receiptNumber}</p>
              <p className="count">تعداد محصولات: {sale.count}</p>
            </div>
            <button className='button-sales' onClick={() => handleViewMore(sale.id)}>
            جزئیات بیشتر
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesHistory;
