import axios from 'axios';
import { listBuilder } from './movies-list-builder';
import { displayLoading, hideLoading } from './loader';
import { pagination, onPaginationClick } from './pagination';

const API_KEY = 'eaafeda4857b9c9fecdb45e75f22375a';
const API_URL = 'https://api.themoviedb.org/3';
const paginationUrl = 'https://api.themoviedb.org/3/search/movie';

const searchInput = document.querySelector('.header__search-input');
const searchForm = document.querySelector('.header__search-form');
const moviesContainer = document.getElementById('movies-container');

let currentPage = 1;
let queryParam = '';

export const searchByKeyword = async query => {
  const noResults = document.querySelector('.header__error-message');
  displayLoading();
  try {
    const response = await axios.get(`${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    if (response.data.results.length === 0) {
      noResults.classList.remove('hidden');
    }
    moviesContainer.innerHTML = '';
    moviesContainer.insertAdjacentHTML('beforeend', listBuilder(response.data.results));
    pagination.reset(response.data.total_results);
  } catch (err) {
    console.log(err);
  }
  hideLoading();
};

searchForm.addEventListener('input', event => {
  event.preventDefault();

  queryParam = searchInput.value.trim();
  const query = searchInput.value.trim();
  if (query === '') return;
  searchByKeyword(query);
});

pagination.on('beforeMove', () => {
  currentPage += 1;
  onPaginationClick(currentPage, paginationUrl, queryParam);
});
