import { Component } from 'react';

import apiService from './services/apiService';

import Container from './components/Container/Container';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import ErrorImg from './components/ErrorImg/ErrorImg';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    query: '',
    images: [],
    largeImageURL: '',
    page: 1,
    error: null,
    isLoading: false,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({ images: [], page: 1, error: null });
    }
  }

  searchImages = async () => {
    const { query, page } = this.state;

    if (query.trim() === '') {
      return toast.info('Please, enter a something for search images!');
    }

    this.toggleLoader();

    try {
      const request = await apiService(query, page);
      this.setState(({ images, page }) => ({
        images: [...images, ...request],
        page: page + 1,
      }));
      if (request.length === 0) {
        this.setState({ error: `Nothing were found for ${query}!` });
      }
    } catch (error) {
      this.setState({ error: 'Something went wrong. Please, try again.' });
    } finally {
      this.toggleLoader();
    }
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.searchImages();
  };

  onLoadMore = () => {
    this.searchImages();
    this.scrolling();
  };

  onOpenModal = e => {
    this.setState({ largeImageURL: e.target.dataset.source });
    this.toggleModal();
  };

  toggleLoader = () => {
    this.setState(({ isLoading }) => ({
      isLoading: !isLoading,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  scrolling = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight,
        behavior: 'smooth',
      });
    }, 1000);
  };

  render() {
    const {
      query,
      images,
      largeImageURL,
      isLoading,
      showModal,
      error,
    } = this.state;
    return (
      <Container>
        <Searchbar
          onHandleSubmit={this.handleSubmit}
          onSearchQueryChange={this.handleChange}
          value={query}
        />

        {error && <ErrorImg texterror={error} />}

        {images.length > 0 && (
          <ImageGallery images={images} onOpenModal={this.onOpenModal} />
        )}

        {isLoading && <Loader />}

        {!isLoading && images.length > 0 && (
          <Button onLoadMore={this.onLoadMore} />
        )}

        {showModal && (
          <Modal
            onToggleModal={this.toggleModal}
            largeImageURL={largeImageURL}
          />
        )}
        <ToastContainer autoClose={3700} />
      </Container>
    );
  }
}

export default App;
