import axios from 'axios';
import { listBuilder } from './movies-list-builder';
import { pagination } from './pagination';

const moviesContainer = document.getElementById('movies-container');

export const trendingUrl =
  'https://api.themoviedb.org/3/trending/movie/day?api_key=eaafeda4857b9c9fecdb45e75f22375a';

window.addEventListener('load', () => {
  getTrendingMovies(trendingUrl);
});

export const getTrendingMovies = async (url, page = 1) => {
  try {
    const response = await axios.get(url + `&page=${page}`);
    moviesContainer.insertAdjacentHTML('beforeend', listBuilder(response.data.results));
    pagination.reset(response.data.total_results);
  } catch (err) {
    console.log(err);
  }
};

pagination.on('beforeMove', async (event, url = trendingUrl) => {
  currentPage = event.page;
  moviesContainer.innerHTML = '';
  try {
    const response = await axios.get(url + `&page=${currentPage}`);
    moviesContainer.insertAdjacentHTML('beforeend', listBuilder(response.data.results));
  } catch (err) {
    console.log(err);
  }
});
