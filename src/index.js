import { onScroll, onToTopBtn, toTopBtn } from './js/scroll';
import {
  onSeadchForm,
  onLoadMoreButton,
  loadMoreBtn,
  searchForm,
} from './js/axios';

searchForm.addEventListener('submit', onSeadchForm);
loadMoreBtn.addEventListener('click', onLoadMoreButton);

window.addEventListener('scroll', onScroll);
toTopBtn.addEventListener('click', onToTopBtn);
