import PropTypes from 'prop-types';
import React, { useState } from 'react';
import PopupWindow from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ webformatURL, largeImageURL }) {
  const [modal, setModal] = useState(false);

  return (
    <li
      className={css.ImageGalleryItem}
      onClick={() => {
        setModal(!modal);
      }}
    >
      <img
        src={webformatURL}
        alt="small"
        className={css.ImageGalleryItemImage}
      />
      {modal && (
        <PopupWindow
          largeImageURL={largeImageURL}
          closeModal={() => {
            setModal(!modal);
          }}
        />
      )}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
