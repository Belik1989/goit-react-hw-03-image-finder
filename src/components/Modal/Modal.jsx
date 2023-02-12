import React from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalBox } from './Modal.styled';
import PropTypes from 'prop-types';

const ModalRoot = document.querySelector('#ModalRoot');

export class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
  }

  keyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  onOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };
  render() {
    const { largeImageURL } = this.props.image;
    return createPortal(
      <Overlay Overlay onClick={this.onOverlayClick}>
        <ModalBox>
          <img src={largeImageURL} alt="img" />
        </ModalBox>
      </Overlay>,
      ModalRoot
    );
  }
}

Modal.propTypes = {
  image: PropTypes.object,
  onClose: PropTypes.func,
};
