import { libStart } from './myLibrary';
import { getTrendingMovies, trendingUrl } from './movies-list';

const library = document.getElementById('library');
const libButtons = document.getElementById('button-group');
const home = document.getElementById('home');
const moviesContainer = document.getElementById('movies-container');

library.addEventListener('click', () => {
  home.classList.remove('navigation__list-link--active');
  library.classList.add('navigation__list-link--active');
  libButtons.classList.remove('hidden');
  libStart();
});

home.addEventListener('click', () => {
  home.classList.add('navigation__list-link--active');
  library.classList.remove('navigation__list-link--active');
  libButtons.classList.add('hidden');
  moviesContainer.innerHTML = '';
  getTrendingMovies(trendingUrl);
});
