import React from 'react';
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';
import { GalleryItem } from './ImagGalleryItem.styled';

export class ImageGalleryItem extends React.Component {
  state = {
    showModal: false,
  };
  onModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  render() {
    const { item } = this.props;
    const { webformatURL } = item;
    return (
      <GalleryItem>
        <img src={webformatURL} onClick={this.onModal} alt="img" />
        {this.state.showModal && <Modal onClose={this.onModal} image={item} />}
      </GalleryItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object,
};
