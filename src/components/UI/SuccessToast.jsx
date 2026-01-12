import React, { useEffect } from 'react';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import './SuccessToast.css';

const SuccessToast = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (message && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className="success-toast">
      <div className="success-icon">
        <FaCheckCircle />
      </div>
      <div className="success-content">
        <p className="success-message">{message}</p>
      </div>
      <button className="success-close" onClick={onClose}>
        <FaTimes />
      </button>
    </div>
  );
};

export default SuccessToast;