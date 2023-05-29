import axios from 'axios';
import { listBuilder } from './movies-list-builder';
import { paginationTrending, onPaginationClick } from './pagination';
import { displayLoading, hideLoading } from './loader';

const moviesContainer = document.getElementById('movies-container');

let currentPage = 1;

export const trendingUrl =
  'https://api.themoviedb.org/3/trending/movie/day?api_key=eaafeda4857b9c9fecdb45e75f22375a';
const paginationUrl = 'https://api.themoviedb.org/3/trending/movie/day';

window.addEventListener('load', () => {
  getTrendingMovies(trendingUrl);
});

export const getTrendingMovies = async (url, page = 1) => {
  displayLoading();
  try {
    const response = await axios.get(url + `&page=${page}`);
    moviesContainer.insertAdjacentHTML('beforeend', listBuilder(response.data.results));
    paginationTrending.reset(response.data.total_results);
  } catch (err) {
    console.log(err);
  }
  hideLoading();
};

paginationTrending.on('beforeMove', () => {
  currentPage += 1;
  onPaginationClick(currentPage, paginationUrl);
});
