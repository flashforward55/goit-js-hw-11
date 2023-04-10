import axios from 'axios';
import {
  searchError,
  searchSucces,
  searchResultEnd,
  errrorStringEmpy,
  errorCatchImages,
} from './notify';

import { displayImages, galleryDiv } from './gallery';

const API_KEY = '35140926-fd12774c1839d7d0854ca625c';
const BASE_URL = `https://pixabay.com/api/`;

const searchForm = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.classList.add('is-hidden');

let searchQuery = '';
let page = 0;
const perPage = 40;

// Function to handle HTTP requests
async function handleRequest(url) {
  try {
    const response = await axios.get(url);
    const data = response.data;
    const images = data.hits;
    const imagesSearchQuery = data.totalHits;
    displayImages(images);

    if (images.length === 0) {
      searchError();
      galleryDiv.innerHTML = '';
      loadMoreBtn.classList.add('is-hidden');
    } else if (page === 1 && images.length < perPage) {
      searchSucces(imagesSearchQuery);
      loadMoreBtn.classList.add('is-hidden');
    } else if (page === 1) {
      searchSucces(imagesSearchQuery);
      loadMoreBtn.classList.remove('is-hidden');
    } else if (images.length < perPage) {
      searchResultEnd();
      loadMoreBtn.classList.add('is-hidden');
    } else {
      loadMoreBtn.classList.remove('is-hidden');
    }
  } catch (error) {
    errorCatchImages();
    console.error(error);
  }
}

// Event listener for the search form
async function onSeadchForm(event) {
  event.preventDefault();
  page = 1;
  searchQuery = event.target.elements.searchQuery.value.trim();
  if (!searchQuery) {
    errrorStringEmpy();
    galleryDiv.innerHTML = '';
    loadMoreBtn.classList.add('is-hidden');
    return;
  }
  galleryDiv.innerHTML = '';
  const url = generateImageUrl(searchQuery);
  await handleRequest(url);
}
// Event listener for the load more button
async function onLoadMoreButton() {
  page += 1;
  const url = generateImageUrl(searchQuery);
  await handleRequest(url);
}
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

export { onSeadchForm, onLoadMoreButton, loadMoreBtn, searchForm, page };
