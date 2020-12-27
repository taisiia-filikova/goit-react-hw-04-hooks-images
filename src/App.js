import { useState, useEffect } from 'react';

import apiService from './services/apiService';

import Container from './components/Container/Container';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import ErrorImg from './components/ErrorImg/ErrorImg';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!query) return;
    const fetchImages = async () => {
      try {
        const request = await apiService(query, page);
        if (request.length === 0) {
          return setError(`Nothing were found for ${query}!`);
        }
        setImages(prevImages => [...prevImages, ...request]);
      } catch (error) {
        setError('Something went wrong. Please, try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [page, query]);

  const searchImages = newSearch => {
    setQuery(newSearch);
    setImages([]);
    setPage(1);
    setError(null);
    setIsLoading(true);
  };

  const onLoadMore = () => {
    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
    scrolling();
  };

  const onOpenModal = evt => {
    setLargeImageURL(evt.target.dataset.source);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const scrolling = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight,
        behavior: 'smooth',
      });
    }, 1000);
  };

  return (
    <Container>
      <Searchbar onHandleSubmit={searchImages} />

      {error && <ErrorImg texterror={error} />}

      {images.length > 0 && !error && (
        <ImageGallery images={images} onOpenModal={onOpenModal} />
      )}

      {isLoading && <Loader />}

      {!isLoading && images.length >= 12 && !error && (
        <Button onLoadMore={onLoadMore} />
      )}

      {showModal && (
        <Modal onToggleModal={toggleModal} largeImageURL={largeImageURL} />
      )}
      <ToastContainer autoClose={3700} />
    </Container>
  );
}

export default App;