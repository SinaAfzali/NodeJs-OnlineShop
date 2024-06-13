import React, { useState } from 'react';
import '../css/SalesHistory.css'; // Import CSS file for styling

const SalesHistory = () => {
  const [salesData, setSalesData] = useState([
    { id: 1, price: 50, date: '2023-05-15', receiptNumber: '123456', count: 3, products: ['Product A', 'Product B'] },
    { id: 2, price: 30, date: '2023-05-17', receiptNumber: '789012', count: 5, products: ['Product C', 'Product D'] },
    { id: 3, price: 80, date: '2023-05-18', receiptNumber: '345678', count: 2, products: ['Product E', 'Product F'] },
    { id: 4, price: 40, date: '2023-05-20', receiptNumber: '901234', count: 4, products: ['Product G', 'Product H'] },
  ]);

  const [expandedSaleId, setExpandedSaleId] = useState(null);

  const handleViewMore = (saleId) => {
    if (expandedSaleId === saleId) {
      setExpandedSaleId(null); 
    } else {
      setExpandedSaleId(saleId); 
    }
  };

  return (
    <div className="sales-history">
      <h2>تاریخچه فروش</h2>
      <div className="sales-list">
        {salesData.map((sale) => (
          <div key={sale.id} className="sale-item">
            <div className="sale-info">
              <p className="price">قیمت فروش: ${sale.price}</p>
              <p className="date">تاریخ: {sale.date}</p>
              <p className="receipt-number">شماره رسید: {sale.receiptNumber}</p>
              <p className="count">تعداد محصولات: {sale.count}</p>
            </div>
            <button onClick={() => handleViewMore(sale.id)}>
              {expandedSaleId === sale.id ? 'بستن جزئیات' : 'جزئیات بیشتر'}
            </button>
            {expandedSaleId === sale.id && (
              <div className="sample-products">
                <h3>محصولات تاریخ {sale.date}:</h3>
                <ul>
                  {sale.products.map((productName, index) => (
                    <li key={index}>{productName}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesHistory;
