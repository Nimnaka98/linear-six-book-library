import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import './Modal.css';

const Modal = ({ isOpen, onClose, title, children, size = 'medium', checkUnsavedChanges }) => {
  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.keyCode === 27) {
        handleClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    if (checkUnsavedChanges && checkUnsavedChanges()) {
      // Don't close if there are unsaved changes - let the form handle it
      return;
    }
    onClose();
  };

  const handleOverlayClick = () => {
    if (checkUnsavedChanges && checkUnsavedChanges()) {
      // Trigger the form's discard dialog by simulating cancel button click
      const cancelButton = document.querySelector('.book-form .form-actions button[type="button"]');
      if (cancelButton) {
        cancelButton.click();
      }
      return;
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div 
        className={`modal-content modal-${size}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={handleClose}>
            <FaTimes />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;