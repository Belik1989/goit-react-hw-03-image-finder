import axios from 'axios';

export async function fetchImages(searchValue, page) {
  const searchParams = new URLSearchParams({
    key: '32122100-8cc25e477ccf1dfc443f6b4e8',
    q: searchValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
    page,
  });
  const images = await axios.get(`https://pixabay.com/api/?${searchParams}`);
  page += 1;
  return images.data;
}
