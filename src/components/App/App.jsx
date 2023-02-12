import React from 'react';

import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImagenGallery/ImageGallery';
// import { ImageGalleryItem } from './ImageGalleryItem';
import { fetchImages } from 'services/fetchImages';
import { Button } from '../Button/Button';
import { Loader } from 'components/Loader/Loader';
import { AppBox } from './App.styled';

let page = 1;

export class App extends React.Component {
  state = {
    items: [],
    searchValue: '',
    status: `idle`,
    totalHits: 0,
  };

  submitHandler = async searchValue => {
    page = 1;
    if (searchValue.trim() === '') {
      alert("You can't search by empty field, try again.");
      return;
    } else {
      try {
        this.setState({ status: 'pending' });
        const { totalHits, hits } = await fetchImages(searchValue, page);
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
      const { hits } = await fetchImages(this.state.searchValue, (page += 1));
      this.setState(prevState => ({
        items: [...prevState.items, ...hits],
        status: 'resolved',
      }));
    } catch (error) {
      this.setState({ status: 'rejected' });
    }
  };

  render() {
    const { totalHits, status, items } = this.state;
    if (status === 'idle') {
      return (
        <AppBox>
          <Searchbar onSubmit={this.submitHandler} />
        </AppBox>
      );
    }
    if (status === 'pending') {
      return (
        <AppBox>
          <Searchbar onSubmit={this.submitHandler} />
          <ImageGallery page={page} items={items} />
          <Loader />
          {totalHits > 12 && <Button onClick={this.onNextPage} />}
        </AppBox>
      );
    }
    if (status === 'rejected') {
      return (
        <AppBox>
          <Searchbar onSubmit={this.submitHandler} />
          <span>Oops!Somthing wrong!Try later.</span>
        </AppBox>
      );
    }
    if (status === 'resolved') {
      return (
        <AppBox>
          <Searchbar onSubmit={this.submitHandler} />
          <ImageGallery page={page} items={items} />
          {totalHits > 12 && totalHits > items.length && (
            <Button onClick={this.onNextPage} />
          )}
        </AppBox>
      );
    }
  }
}
