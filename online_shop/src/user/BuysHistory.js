import React from 'react';
import '../css/BuysHistory.css'; // Import CSS file for styling

const BuysHistory = () => {
  return (
    <div className="buy-history">
      <h2>Sales History</h2>
      {/* Display selling history data */}
      <div className="buy-list">
        {/* Sample sales data */}
        <div className="buy-item">
          <div className="buy-info">
            <p className="buy">Sell Price: $50</p>
            <p className="buy">Count: 3</p>
          </div>
        </div>
        <div className="buy-item">
          <div className="buy-info">
            <p className="price">Sell Price: $30</p>
            <p className="count">Count: 5</p>
          </div>
        </div>
        {/* Add more sales items as needed */}
      </div>
    </div>
  );
};

export default BuysHistory;
