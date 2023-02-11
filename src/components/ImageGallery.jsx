import React from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ items }) => {
  return (
    <ul>
      {items.map(item => (
        <ImageGalleryItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

ImageGallery.PropeTypes = {
  images: PropTypes.array,
};
