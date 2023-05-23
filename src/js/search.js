import axios from 'axios';

const API_KEY = 'eaafeda4857b9c9fecdb45e75f22375a';
const API_URL = 'https://api.themoviedb.org/3';

const searchMovies = async (query, page) => {
  const response = await axios.get(
    `${API_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`,
  );
  return response.json();
};

const getGenresForSearch = async () => {
  try {
    const GET_GENRES_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=${page}`;
    const response = await axios.get(GET_GENRES_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const getMoviesForSearch = async (query, page = 1) => {
  try {
    const GET_MOVIES = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`;
    const response = await axios.get(GET_MOVIES);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const getMovieByIDForSearch = async id => {
  try {
    const MOVIE_BY_ID = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
    const response = await axios.get(MOVIE_BY_ID);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

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

const renderMoviesCollection = moviesCollection => {
  const moviesCollectionDOM = document.querySelector('.covers-container');

  const markup = moviesCollection
    .map(
      ({
        id,
        title,
        poster_path,
        release_date,
        genre_ids,
      }) => `<div class="cover__container" data-id="${id}">
      <img src="https://image.tmdb.org/t/p/w400${poster_path}" alt="" class="cover__image"/>
      <div class="cover-data">
        <p class="cover-data__tittle">${title}</p>
        <p class="cover-data__info">
          <span class="cover-data__info">${genreToString(genre_ids)}</span> |
          <span class="cover-data__info">${new Date(release_date).getFullYear()}</span>
        </p>
      </div>
    </div>
`,
    )
    .join('');

  moviesCollectionDOM.innerHTML = markup;
};

const searchInput = document.querySelector('.header__search-input');
const searchForm = document.querySelector('.header__search-form');
const noResults = document.querySelector('.no-results');

const searchByKeyword = query => {
  const noResults = document.querySelector('.header__error-message');
  fetch(`${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`)
    .then(response => response.json())
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

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const query = searchInput.value;
  if (query === '') return;

  searchByKeyword(query);
});

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const query = searchInput.value;
  if (query === '') return;

  searchByKeyword(query);
});
