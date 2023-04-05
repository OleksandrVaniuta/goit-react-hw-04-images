import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import css from './Modal.module.css';

export default function PopupWindow({ largeImageURL, closeModal }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = e => {
    if (e.currentTarget !== e.target) {
      closeModal();
    }
  };

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleClick}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt="large" />
      </div>
    </div>,
    document.querySelector('#popup-root')
  );
}

PopupWindow.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
