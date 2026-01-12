import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import './MegaDropdown.css';

const MegaDropdown = ({ title, items, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`mega-dropdown-container ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="mega-dropdown-trigger">
        {title}
        <FaChevronDown className={`mega-dropdown-arrow ${isOpen ? 'open' : ''}`} />
      </div>
      
      <div className={`mega-dropdown-overlay ${isOpen ? 'show' : ''}`}>
        <div className="container">
          <div className="mega-dropdown-grid">
            {items.map((item, index) => (
              <a key={index} href={item.href || '#'} className="mega-dropdown-item">
                <div className="mega-item-content">
                  <h3 className="mega-item-title">{item.label}</h3>
                  <p className="mega-item-description">{item.description}</p>
                </div>
                <div className="mega-item-image">
                  <img src={item.image} alt={item.label} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaDropdown;