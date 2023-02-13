import React from 'react';

import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImagenGallery/ImageGallery';

import { fetchImages } from 'services/fetchImages';
import { Button } from '../Button/Button';
import { Loader } from 'components/Loader/Loader';
import { AppBox } from './App.styled';

export class App extends React.Component {
  state = {
    items: [],
    searchValue: '',
    status: `idle`,
    totalHits: 0,
    page: 1,
  };

  submitHandler = async searchValue => {
    if (searchValue.trim() === '') {
      alert("You can't search by empty field, try again.");
      return;
    } else {
      try {
        this.setState({ status: 'pending' });
        const { totalHits, hits } = await fetchImages(
          searchValue,
          this.state.page
        );
        if (hits.length < 1) {
          this.setState({ status: 'idle' });
          alert(
            'Sorry, there are no images matching your search query. Please try again'
          );
        } else {
          this.setState({
            items: hits,
            searchValue,
            totalHits: totalHits,
            status: 'resolved',
          });
        }
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
  };

  onNextPage = async () => {
    this.setState({ status: 'pending' });
    try {
      const { hits } = await fetchImages(
        this.state.searchValue,
        (this.state.page += 1)
      );
      this.setState(prevState => ({
        items: [...prevState.items, ...hits],
        status: 'resolved',
      }));
    } catch (error) {
      this.setState({ status: 'rejected' });
    }
  };

  render() {
    const { status, items, page, totalHits } = this.state;
    const totalPages = items.length / (page * totalHits);
    return (
      <AppBox>
        <Searchbar onSubmit={this.submitHandler} />
        <ImageGallery items={items} />
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <span>Oops!Something wrong!Try later.</span>}
        {totalPages < 1 && status === 'resolved' && (
          <Button onClick={this.onNextPage} />
        )}
      </AppBox>
    );
  }
}
