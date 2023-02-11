import React from 'react';
import PropTypes from 'prop-types';

export class Searchbar extends React.Component {
  state = {
    searchValue: '',
  };
  inputHandler = async event => {
    this.setState({ searchValue: event.currentTarget.value.toLowerCase() });
  };

  handlerSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.searchValue);
    this.setState({ searchValue: '' });
  };
  render() {
    const { searchValue } = this.state.searchValue;
    return (
      <header>
        <form onSubmit={this.handlerSubmit}>
          <button type="submit">
            <span>Search</span>
          </button>

          <input
            name="searchValue"
            type="text"
            value={searchValue}
            typeof="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.inputHandler}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
