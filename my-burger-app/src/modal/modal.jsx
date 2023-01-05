import React from 'react';

import './modal.css';

const Modal = ({ active, setActive, clearModal, children }) => {
  return (
    <div
      className={active ? 'modal active' : 'modal'}
      onClick={() => {
        clearModal();
        setActive(false);
      }}
    >
      <div
        className={active ? 'modal-content active' : 'modal-content'}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div id='container'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
