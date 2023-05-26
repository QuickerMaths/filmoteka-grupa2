import axios from 'axios';
import { listBuilder } from './movies-list-builder';
import noImage from '../images/no-image.png';

const moviesContainer = document.querySelector('.covers-container');

// export const genresList = {};

// const getGenres = async url => {
//   try {
//     const genresResponse = await axios.get(url);
//     const genresArray = genresResponse.data.genres;

//     genresArray.map(genre => {
//       genresList[`${genre['id']}`] = genre.name;
//     });

//     return genresList;
//   } catch (err) {
//     console.log(err);
//   }
// };

const getMovies = async url => {
  try {
    const moviesResponse = await axios.get(url);
    const moviesArray = moviesResponse.data.results;

    return moviesArray;
  } catch (err) {
    console.log(err);
  }
};

const trendingMoviesURL =
  'https://api.themoviedb.org/3/trending/movie/week?api_key=eaafeda4857b9c9fecdb45e75f22375a';

const getDataFromAPI = async searchURL => {
  try {
    moviesContainer.innerHTML = '';

    await getMovies(searchURL).then(response => {
      listBuilder(response);
    });
  } catch (err) {
    console.log(err);
  }
};

getDataFromAPI(trendingMoviesURL);

export const searchMovie = async (query, page = 1) => {
  const searchLink = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}&api_key=eaafeda4857b9c9fecdb45e75f22375a`;

  return await getDataFromAPI(searchLink);
};
