import React from 'react';
import { Modal } from './Modal';
import PropTypes from 'prop-types';

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
      <li>
        <img src={webformatURL} onClick={this.onModal} alt="img" />
        {this.state.showModal && <Modal onClose={this.onModal} image={item} />}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object,
};
