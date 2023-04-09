import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';

const API_KEY = '35140926-fd12774c1839d7d0854ca625c';
const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}`;

const searchForm = document.querySelector('#search-form');
const galleryDiv = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let page = 0;
let searchQuery = '';
const perPage = 40;
loadMoreBtn.classList.add('is-hidden');

// Function to display images on the page
function displayImages(images, totalPages) {
  const galleryItems = images.map(
    image => `
    <li class="gallery-item">
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy">
        <div class="details">
          <span class="likes">${image.likes}</span>
          <span class="views">${image.views}</span>
          <span class="comments">${image.comments}</span>
          <span class="downloads">${image.downloads}</span>
        </div>
      </a>
    </li>
  `
  );
  galleryDiv.insertAdjacentHTML('beforeend', galleryItems.join(''));

  // Activate the simplelightbox plugin
  let lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
  }).refresh();

  if (page !== 1) smoothPageScrolling(images);
}

//Smooth page scrolling after the request
function smoothPageScrolling(images) {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  const scrollAmount = cardHeight * images.length;
  window.scrollBy({
    top: scrollAmount,
    behavior: 'smooth',
  });
}

// Function to handle HTTP requests
async function handleRequest(url) {
  try {
    const response = await axios.get(url);
    const data = response.data;
    const images = data.hits;
    const imagesSearchQuery = data.totalHits;
    const totalPages = Math.ceil(imagesSearchQuery / perPage);
    displayImages(images, totalPages);

    if (images.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      galleryDiv.innerHTML = '';
      loadMoreBtn.classList.add('is-hidden');
    } else if (page === 1 && images.length < 40) {
      loadMoreBtn.classList.add('is-hidden');
      Notify.success(`Hooray! We found ${imagesSearchQuery} images`);
    } else if (page === 1) {
      Notify.success(`Hooray! We found ${imagesSearchQuery} images`);
      loadMoreBtn.classList.remove('is-hidden');
    } else if (images.length < 40) {
      loadMoreBtn.classList.add('is-hidden');
      Notify.info("We're sorry, but you've reached the end of search results.");
    } else {
      loadMoreBtn.classList.remove('is-hidden');
    }
  } catch (error) {
    Notify.failure('Error fetching images. Please try again later.');
  }
}

// Event listener for the search form
searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  page = 1;
  searchQuery = event.target.elements.searchQuery.value.trim();
  if (!searchQuery) {
    Notify.failure(
      'The search string cannot be empty. Please specify your search query'
    );
    galleryDiv.innerHTML = '';
    loadMoreBtn.classList.add('is-hidden');
    return;
  }
  galleryDiv.innerHTML = '';
  const url = `${BASE_URL}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
  await handleRequest(url);
});

// Event listener for the load more button
loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  const url = `${BASE_URL}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
  await handleRequest(url);
});

const toTopBtn = document.querySelector('.btn-to-top');

window.addEventListener('scroll', onScroll);
toTopBtn.addEventListener('click', onToTopBtn);

function onScroll() {
  const scrolled = window.pageYOffset;
  const coords = document.documentElement.clientHeight;
  if (scrolled > coords) {
    toTopBtn.classList.add('show');
  } else {
    toTopBtn.classList.remove('show');
  }
}

function onToTopBtn() {
  if (window.pageYOffset > 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
