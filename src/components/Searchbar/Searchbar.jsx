import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = event => {
    this.setState({ searchQuery: event.currentTarget.value });
    // console.log(event.currentTarget.value);
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      toast.warn('The field cannot be empty!', {
        theme: 'colored',
      });
      return;
    }

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchbar__form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchbar__btn}>
            <span className={css.searchbar__btn__label}>Search</span>
          </button>

          <input
            onChange={this.handleChange}
            value={this.state.searchQuery}
            name="searchQuery"
            className={css.searchbar__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
