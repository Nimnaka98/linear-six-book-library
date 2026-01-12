import React, { useEffect } from 'react';
import { FaExclamationCircle, FaTimes } from 'react-icons/fa';
import './ErrorToast.css';

const ErrorToast = ({ error, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (error && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [error, duration, onClose]);

  if (!error) return null;

  return (
    <div className="error-toast">
      <div className="error-icon">
        <FaExclamationCircle />
      </div>
      <div className="error-content">
        <h4 className="error-title">Error</h4>
        <p className="error-message">{error}</p>
      </div>
      <button className="error-close" onClick={onClose}>
        <FaTimes />
      </button>
    </div>
  );
};

export default ErrorToast;