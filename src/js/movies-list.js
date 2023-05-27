import axios from 'axios';
import { listBuilder } from './movies-list-builder';

const moviesContainer = document.getElementById('movies-container');

export const trendingUrl =
  'https://api.themoviedb.org/3/trending/movie/day?api_key=eaafeda4857b9c9fecdb45e75f22375a';

window.addEventListener('load', () => {
  getTrendingMovies(trendingUrl);
});

export const getTrendingMovies = async url => {
  try {
    const response = await axios.get(url);
    moviesContainer.insertAdjacentHTML('beforeend', listBuilder(response.data.results));
  } catch (err) {
    console.log(err);
  }
};
