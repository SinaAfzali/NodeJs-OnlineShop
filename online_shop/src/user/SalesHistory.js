import React from 'react';
import '../css/SalesHistory.css'; // Import CSS file for styling

const SalesHistory = () => {
  // Logic to fetch and display selling history
  return (
    <div className="sales-history">
      <h2>Sales History</h2>
      {/* Display selling history data */}
      <div className="sales-list">
        {/* Sample sales data */}
        <div className="sale-item">
          <div className="sale-info">
            <p className="price">Sell Price: $50</p>
            <p className="count">Count: 3</p>
          </div>
        </div>
        <div className="sale-item">
          <div className="sale-info">
            <p className="price">Sell Price: $30</p>
            <p className="count">Count: 5</p>
          </div>
        </div>
        {/* Add more sales items as needed */}
      </div>
    </div>
  );
};

export default SalesHistory;
