// src/Modal.js
import React from 'react';
import './style.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className='modal-side'>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className='modal-child'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
