const toTopBtn = document.querySelector('.btn-to-top');

function onScroll() {
  const scrolled = window.scrollY;
  const coords = document.documentElement.clientHeight;
  if (scrolled > coords) {
    toTopBtn.classList.add('show');
  } else {
    toTopBtn.classList.remove('show');
  }
}

function onToTopBtn() {
  if (window.scrollY > 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

export { onScroll, onToTopBtn, toTopBtn };
