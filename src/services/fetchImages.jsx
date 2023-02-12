import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32122100-8cc25e477ccf1dfc443f6b4e8';
const IMAGES_PER_PAGE = 12;

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: IMAGES_PER_PAGE,
};

export const fetchImages = async (searchValue, page) => {
  const config = {
    params: {
      q: searchValue,
      page: page,
    },
  };
  const images = await axios.get('', config);
  return images.data;
};
