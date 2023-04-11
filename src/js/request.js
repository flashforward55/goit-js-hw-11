import { page, perPage } from './axios';

const API_KEY = '35140926-fd12774c1839d7d0854ca625c';
const BASE_URL = `https://pixabay.com/api/`;

//Query string generation function
function generateImageUrl(searchQuery) {
  const params = {
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: perPage,
  };

  const queryString = new URLSearchParams(params).toString();
  const imageUrl = `${BASE_URL}?${queryString}`;

  return imageUrl;
}

export { generateImageUrl };
