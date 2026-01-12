import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import './Rating.css';

const Rating = ({ rating, showText = true, size = 'medium' }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className={`star filled star-${size}`} />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className={`star half star-${size}`} />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className={`star empty star-${size}`} />);
    }
    
    return stars;
  };

  return (
    <div className="rating-container">
      <div className="stars">
        {renderStars()}
      </div>
      {showText && <span className="rating-text">({rating})</span>}
    </div>
  );
};

export default Rating;