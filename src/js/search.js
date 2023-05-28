import axios from 'axios';
import { listBuilder } from './movies-list-builder';
import { pagination } from './pagination';
import { displayLoading, hideLoading } from './loader';
import debounce from 'lodash.debounce';

const API_KEY = 'eaafeda4857b9c9fecdb45e75f22375a';
const API_URL = 'https://api.themoviedb.org/3';

const searchInput = document.querySelector('.header__search-input');
const searchForm = document.querySelector('.header__search-form');
const moviesContainer = document.getElementById('movies-container');

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

searchForm.addEventListener(
  'input',
  event => {
    event.preventDefault();

    queryParam = searchInput.value.trim();
    const query = searchInput.value.trim();
    if (query === '') return;
    searchByKeyword(query);
  },
  debounce(query => {
    query = searchInput.value.trim();
    searchByKeyword(query);
  }, 200),
);
pagination.on('beforeMove', async (event, query = queryParam) => {
  currentPage = event.page;
  moviesContainer.innerHTML = '';
  try {
    const response = await axios.get(
      `${API_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${currentPage}`,
    );
    moviesContainer.insertAdjacentHTML('beforeend', listBuilder(response.data.results));
  } catch (err) {
    console.log(err);
  }
});
