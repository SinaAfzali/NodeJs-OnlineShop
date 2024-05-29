import React from 'react';
import '../css/Creator.css'; // Make sure to create this CSS file
// import creator1Image from './images/creator1.png'; // Replace with actual image paths
// import creator2Image from './images/creator2.png'; // Replace with actual image paths

const Creator = () => {
  return (
    <div className="creator-page">
      <h1>Meet the Creators</h1>
      <div className="creators-container">
        <div className="creator-card">
          {/* <img src={creator1Image} alt="Creator 1" className="creator-image" /> */}
          <h2>Creator 1</h2>
          <p>Creator 1 is an expert in product design and user experience. They have over 10 years of experience in the field and have worked with top tech companies.</p>
        </div>
        <div className="creator-card">
          {/* <img src={creator2Image} alt="Creator 2" className="creator-image" /> */}
          <h2>Creator 2</h2>
          <p>Creator 2 specializes in backend development and system architecture. With a strong background in computer science, they ensure the shop runs smoothly and efficiently.</p>
        </div>
      </div>
    </div>
  );
};

export default Creator;
