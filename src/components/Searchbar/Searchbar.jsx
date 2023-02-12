import React from 'react';
import PropTypes from 'prop-types';
import {
  SearchbarBox,
  SearchForm,
  SearchFormButton,
  SearchbarInput,
} from './Searchbar.styled';
import { FcSearch } from 'react-icons/fc';

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
      <SearchbarBox>
        <SearchForm onSubmit={this.handlerSubmit}>
          <SearchFormButton type="submit">
            <FcSearch />
          </SearchFormButton>

          <SearchbarInput
            name="searchValue"
            type="text"
            value={searchValue}
            typeof="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.inputHandler}
          />
        </SearchForm>
      </SearchbarBox>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
