import React, { Component } from 'react';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = event => {
    this.setState({ searchQuery: event.target.value });
    // console.log(event.target.value);
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      alert('Field can not be empty!');
      return;
    }

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form">
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            onChange={this.handleChange}
            value={this.state.searchQuery}
            className="input"
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