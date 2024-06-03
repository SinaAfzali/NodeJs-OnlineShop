import React, { useState } from 'react';
import '../css/showProduct.css';

const sampleProduct = {
  name: 'پیراهن مردانه شیک',
  rate: 4.5,
  image: require('../images/sample-product.png'),
  price: '299,000',
  description: 'یک پیراهن مردانه بسیار شیک و با کیفیت، مناسب برای تمامی فصول سال.',
  oddInformation: 'این محصول از نخ 100٪ طبیعی ساخته شده است و دارای قابلیت تنفس بالا می‌باشد.'
};

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

  const handleRatingChange = (e) => {
    setUserRating(Number(e.target.value));
  };

  const handleSubmitRating = () => {
    if (userRating) {
      alert(`You rated this product: ${userRating} stars`);
      // Update the displayed rating stars
      sampleProduct.rate = userRating;
    }
  };

  const toggleImageSize = () => {
    setIsImageEnlarged(!isImageEnlarged);
  };

  return (
    <div className="product-detail-page">
      <div className="product-card">
        <h1 className="product-name">{sampleProduct.name}</h1>
        <img
          src={sampleProduct.image}
          alt={sampleProduct.name}
          className={`product-image ${isImageEnlarged ? 'enlarged' : ''}`}
          onClick={toggleImageSize}
        />
        <div className="price-rating">
          <p className="product-price">{sampleProduct.price}</p>
          <div className="product-rating">{renderStars(sampleProduct.rate)}</div>
        </div>
        <p className="product-description">{sampleProduct.description}</p>
        <p className="product-odd-information"><strong>اطلاعات اضافی :</strong> {sampleProduct.oddInformation}</p>
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
