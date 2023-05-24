import axios from 'axios';
import renderMoviesCollection from './movies-list';

const API_KEY = 'eaafeda4857b9c9fecdb45e75f22375a';
const API_URL = 'https://api.themoviedb.org/3';

const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

const GENRES_SHOWN = 3;

const genreToString = genreIdArray =>
  genreIdArray
    .map(id => genres.find(genre => genre.id == id))
    .map(genre => genre.name)
    .filter((genre, index) => index < GENRES_SHOWN)
    .join(', ');

const searchInput = document.querySelector('.header__search-input');
const searchForm = document.querySelector('.header__search-form');
const noResults = document.querySelector('.no-results');

const searchByKeyword = query => {
  const noResults = document.querySelector('.header__error-message');
  axios
    .get(`${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`)
    .then(data => {
      if (data.results.length === 0) {
        noResults.classList.remove('hidden');
      } else {
        noResults.classList.add('hidden');
        renderMoviesCollection(data.results);
      }
    })
    .catch(error => console.error(error));
};

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const query = searchInput.value;
  if (query === '') return;

  searchByKeyword(query);
});
