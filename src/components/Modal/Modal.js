import PropTypes from 'prop-types';
import s from './Modal.module.css';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

function Modal({ largeImageURL, onToggleModal }) {
  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        onToggleModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onToggleModal]);

  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      onToggleModal();
    }
  };

  return createPortal(
    <div className={s.backdrop} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <img src= {largeImageURL} alt= ''/>
      </div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  onToggleModal: PropTypes.func.isRequired,
};

export default Modal;