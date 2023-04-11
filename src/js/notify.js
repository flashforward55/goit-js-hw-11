import { Notify } from 'notiflix/build/notiflix-notify-aio';

const notiflixOptions = {
  width: '330px',
  fontSize: '16px',
  position: 'right-top',
  borderRadius: '4px',
  timeout: 2500,
  cssAnimationDuration: 600,
  cssAnimationStyle: 'from-right',
};

// Notify functions
function searchError() {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    notiflixOptions
  );
}

function searchSucces(imagesSearchQuery) {
  Notify.success(
    `Hooray! We found ${imagesSearchQuery} images`,
    notiflixOptions
  );
}

function searchResultEnd() {
  Notify.info(
    "We're sorry, but you've reached the end of search results.",
    notiflixOptions
  );
}

function errrorStringEmpy() {
  Notify.failure(
    'The search string cannot be empty. Please specify your search query',
    notiflixOptions
  );
}

function errorCatchImages() {
  Notify.failure('Error fetching images. Please try again later.'),
    notiflixOptions;
}

export {
  searchError,
  searchSucces,
  searchResultEnd,
  errrorStringEmpy,
  errorCatchImages,
};
