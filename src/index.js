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
const perPage = 20;

// Function to display images on the page
function displayImages(images) {
  images.forEach(image => {
    const div = document.createElement('div');
    div.classList.add('gallery-item');

    const img = document.createElement('img');
    img.src = image.webformatURL;
    img.alt = image.tags;
    img.loading = 'lazy';

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('details');

    const likesSpan = document.createElement('span');
    likesSpan.classList.add('likes');
    likesSpan.textContent = image.likes.toString();

    const viewsSpan = document.createElement('span');
    viewsSpan.classList.add('views');
    viewsSpan.textContent = image.views.toString();

    const commentsSpan = document.createElement('span');
    commentsSpan.classList.add('comments');
    commentsSpan.textContent = image.comments.toString();

    const downloadsSpan = document.createElement('span');
    downloadsSpan.classList.add('downloads');
    downloadsSpan.textContent = image.downloads.toString();

    detailsDiv.appendChild(likesSpan);
    detailsDiv.appendChild(viewsSpan);
    detailsDiv.appendChild(commentsSpan);
    detailsDiv.appendChild(downloadsSpan);

    const link = document.createElement('a');
    link.href = image.largeImageURL;
    link.appendChild(img);
    link.appendChild(detailsDiv);

    div.appendChild(link);

    galleryDiv.appendChild(div);
  });

  // Activate the simplelightbox plugin
  let lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
  }).refresh();
}

// Function to handle HTTP requests
async function handleRequest(url) {
  try {
    const response = await axios.get(url);
    const data = response.data;
    const images = data.hits;
    const imagesSearchQuery = data.totalHits;
    displayImages(images);
    if (page === 1)
      Notify.success(
        `Request completed successfully. We found ${imagesSearchQuery} images`
      );
    if (images.length === 0) {
      Notify.failure('No images found. Please try a different search query.');
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
