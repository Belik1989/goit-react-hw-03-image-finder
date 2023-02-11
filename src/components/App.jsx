import React from 'react';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
// import { ImageGalleryItem } from './ImageGalleryItem';
import { fetchImages } from 'services/fetchImages';
import { Button } from './Button';

let page = 1;

export class App extends React.Component {
  state = {
    items: [],
    searchValue: '',
    status: `idle`,
    totalHits: 0,
  };
  // async componentDidMount() {
  //   fetchImages();
  //   console.log(this.state);
  // }

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
        <div>
          <Searchbar onSubmit={this.submitHandler} />
        </div>
      );
    }
    if (status === 'pending') {
      return (
        <div>
          <Searchbar onSubmit={this.submitHandler} />
          <ImageGallery page={page} items={items} />
          {totalHits > 12 && <Button onClick={this.onNextPage} />}
        </div>
      );
    }
    if (status === 'rejected') {
      return (
        <div>
          <Searchbar onSubmit={this.submitHandler} />
          <span>Oops!Somthing wrong!Try later.</span>
        </div>
      );
    }
    if (status === 'resolved') {
      return (
        <div>
          <Searchbar onSubmit={this.submitHandler} />
          <ImageGallery page={page} items={items} />
          {totalHits > 12 && totalHits > items.length && (
            <Button onClick={this.onNextPage} />
          )}
        </div>
      );
    }
  }
}
