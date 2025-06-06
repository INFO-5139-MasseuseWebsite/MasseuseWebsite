import React from 'react';

const TreatmentCard = ({ image, alt, title, description, price }) => {
  return (
    <div className="treatment-card">
      <div className="treatment-image-container">
        <img src={image} alt={alt} className="treatment-image" />
      </div>
        <h3><a href="#">{title}</a></h3>
        <p>{description}</p>
        <p className="price">{price}</p>
    </div>
  );
};

export default TreatmentCard;
