import axios from 'axios';
import { listBuilder } from './movies-list-builder';

const API_KEY = 'eaafeda4857b9c9fecdb45e75f22375a';
const API_URL = 'https://api.themoviedb.org/3';

const searchInput = document.querySelector('.header__search-input');
const searchForm = document.querySelector('.header__search-form');
const moviesContainer = document.getElementById('movies-container');

export const searchByKeyword = async (query, page = 1) => {
  const noResults = document.querySelector('.header__error-message');

  try {
    const response = await axios.get(
      `${API_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`,
    );
    if (response.data.results.length === 0) {
      noResults.classList.remove('hidden');
    }
    moviesContainer.innerHTML = '';
    moviesContainer.insertAdjacentHTML('beforeend', listBuilder(response.data.results));
  } catch (err) {
    console.log(err);
  }
};

searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const query = searchInput.value;
  if (query === '') return;
  searchByKeyword(query);
});
