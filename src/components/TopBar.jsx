import React from 'react';
import { FaInstagram, FaFacebook, FaShopify, FaLinkedin } from 'react-icons/fa';
import './TopBar.css';

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="container">
        <div className="topbar-content">
          <div className="topbar-left">
            <span>FREE SHIPPING FOR ORDERS OVER $50</span>
          </div>
          <div className="topbar-right">
            <div className="social-icons">
              <i className="fa-brands fa-x-twitter social-icon"></i>
              <FaInstagram className="social-icon" />
              <FaFacebook className="social-icon" />
              <FaShopify className="social-icon" />
              <FaLinkedin className="social-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;