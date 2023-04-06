import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Swearchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Bytton';
import Loader from './Loader/Loader';
import css from './App.module.css';
import photosAPI from '../secvices/photos-api';

export default function App() {
  const [cards, setCards] = useState([]);
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const hanleSubmit = e => {
    e.preventDefault();
    const inputValie = e.target.elements.input.value;
    if (inputValie.trim() === '') {
      return;
    }
    setCards([]);
    setValue(inputValie);
    setPage(1);
    setError(null);
  };

  useEffect(() => {
    if (value === '') {
      return;
    }
    setLoading(true);

    photosAPI
      .FetchPhotos(value, page)
      .then(res => {
        if (res.hits.length === 0) {
          return Promise.reject(new Error());
        }
        setCards([...cards, ...res.hits]);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [value, page]);

  return (
    <div className={css.App}>
      <Searchbar onSubmit={hanleSubmit} />
      {error && <h2>Something go wrong, please try again with new value!</h2>}
      {cards.length > 0 && <ImageGallery cards={cards} />}
      {cards.length > 0 && !loading && (
        <Button
          onClick={() => {
            setPage(page + 1);
          }}
        />
      )}
      {loading && <Loader />}
    </div>
  );
}
