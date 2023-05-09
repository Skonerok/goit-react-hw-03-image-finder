import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { fetchImages } from '../services/fetch';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    loading: false,
    showModal: false,
    showBtn: false,
    modalImage: '',
  }
  
  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  }

  handleImageClick = image => {
   this.setState({showModal: true, modalImage: image.largeImageURL})
  };

   handleLoadMore = () => {
    const { searchQuery, page } = this.state;
     const nextPage = page + 1;
     this.setState({ loading: true });
     fetchImages(searchQuery, nextPage);
  };

   handleCloseModal = () => {
    this.setState({ showModal: false, modalImage: '' });
  };

  render() {
    const { images, loading, showModal, modalImage } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {loading && <Loader />}
        {!images.length && <Button onClick={this.handleLoadMore} />}
        {showModal && (
          <Modal onClose={this.handleCloseModal}>
            <img src={modalImage} alt="" />
          </Modal>
        )}
      </>
    );
  };
};
