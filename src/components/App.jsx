import { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import fetchImages from '../components/services/fetch';
import { AppContainer } from './App.styled';

axios.defaults.baseURL = 'https://pixabay.com/api/';
export class App extends Component {
  static propTypes = { searchQuery: PropTypes.string };
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    selectedImage: null,
    alt: null,
    status: 'idle',
    error: null,
  };
  totalHits = null;

  async componentDidUpdate(_, prevState) {
    const { page, searchQuery } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ status: 'pending' });

      try {
        const imageData = await fetchImages(searchQuery, page);
        this.totalHits = imageData.total;
        const imagesHits = imageData.hits;
        if (!imagesHits.length) {
          toast.warning('Nothing was found for your request.');
        }
        this.setState(({ images }) => ({
          images: [...images, ...imagesHits],
          status: 'resolved',
        }));

      } catch (error) {
        toast.error(`Something went wrong. ${error.message}`);
        this.setState({ status: 'rejected' });
      }
    }
  }
  handleFormSubmit = searchQuery => {
    if (this.state.searchQuery === searchQuery) {
      return;
    }
    this.resetState();
    this.setState({ searchQuery });
  };
  handleSelectedImage = (largeImageUrl, tags) => {
    this.setState({
      selectedImage: largeImageUrl,
      alt: tags,
    });
  };

  resetState = () => {
    this.setState({
      searchQuery: '',
      page: 1,
      images: [],
      selectedImage: null,
      alt: null,
      status: 'idle',
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  closeModal = () => {
    this.setState({
      selectedImage: null,
    });
  };

  render() {
    const { images, status, selectedImage, alt, error } = this.state;
    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer autoClose={3000} theme="colored" />
        {status === 'pending' && <Loader />}
        {error && (
          <h1 style={{ color: 'orangered', textAlign: 'center' }}>
            {error.message}
          </h1>
        )}
        {images.length > 0 && (
          <ImageGallery
            images={images}
            selectedImage={this.handleSelectedImage}
          />
        )}
        {images.length > 0 && images.length !== this.totalHits && (
          <Button onClick={this.loadMore} />
        )}
        {selectedImage && (
          <Modal
            selectedImage={selectedImage}
            tags={alt}
            onClose={this.closeModal}
          />
        )}
      </AppContainer>
    );
  }
}