import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Notify functions
function searchError() {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function searchSucces(imagesSearchQuery) {
  Notify.success(`Hooray! We found ${imagesSearchQuery} images`);
}

function searchResultEnd() {
  Notify.info("We're sorry, but you've reached the end of search results.");
}

function errrorStringEmpy() {
  Notify.failure(
    'The search string cannot be empty. Please specify your search query'
  );
}

function errorCatchImages() {
  Notify.failure('Error fetching images. Please try again later.');
}

export {
  searchError,
  searchSucces,
  searchResultEnd,
  errrorStringEmpy,
  errorCatchImages,
};
