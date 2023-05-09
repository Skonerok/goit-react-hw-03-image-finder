import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import fetchImages from './services/fetch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    selectedImage: null,
    loading: false,
    status: 'idle',
    error: null,
  }
  totalHits = null;

  async componentDidUpdate(_, prevState) {
    const { page, searchQuery } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ status: 'pending', loading: true });
    }

     try {
        const imageData = await fetchImages(searchQuery, page);
        this.totalHits = imageData.total;
        const imagesHits = imageData.hits;
        if (!imagesHits.length) {
          toast.error('No results were found for your search, please try something else.', {
            theme: 'colored',
          });
        }
        this.setState(({ images }) => ({
          images: [...images, ...imagesHits],
          loading: false,
          status: 'resolved',
        }));

      } catch (error) {
       toast.error(`Sorry something went wrong`, {
          theme: 'colored',
        });
        this.setState({ status: 'rejected', loading: false });
      }
  }
  
  handleFormSubmit = searchQuery => {
    // this.setState({ searchQuery });
     if (this.state.searchQuery === searchQuery) {
      return;
    }
    this.resetState();
    this.setState({ searchQuery });
  }

  handleSelectedImage = (largeImageUrl) => {
   this.setState({ selectedImage: largeImageUrl })
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

   handleLoadMore = () => {
      this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

   handleCloseModal = () => {
      this.setState({
      selectedImage: null,
    });
  };

  render() {
    const { images, selectedImage, loading, alt } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {loading && <Loader />}
        {images.length > 0 && (
          <ImageGallery
            images={images}
            onClick={this.handleSelectedImage}
          />
        )}
        {images.length > 0 && images.length !== this.totalHits && (
          <Button btnLoadMore={this.handleLoadMore} />
        )}
        <ToastContainer autoClose={3000} />
        {selectedImage && (
          <Modal
          selectedImage={selectedImage}
          tags={alt}
          onClose={this.handleCloseModal}
          />
        )}
      </>
    );
  };
};
