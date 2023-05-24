import axios from 'axios';
import Pagination from 'tui-pagination';

const listFilms = document.querySelector('.movies-list');
const API_KEY = 'eaafeda4857b9c9fecdb45e75f22375a';
const searchForm = document.querySelector('.header__search-form');
let searchMore = '';
const spinner = document.querySelector('.spinner');
const messageNoResoults = document.querySelector('.header__error-message');

let currentPage = 1;
let totalItems = 0;

// let page;
// let query;

// zaciąganie danych

const fetchSearchMovies = async (query, page) => {
  const exportData = await axios.get(
    `
    https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`,
  );

  return exportData;
};
// tłumaczenie id.id na name

function idToGenere(genID) {
  for (let id of nameGeneres) {
    if (id.id === genID) {
      return id.name;
    }
  }
}

const nameGeneres = [
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

// wyświetlanie filmów

export function renderFilms(images) {
  if (images.data.results.length === 0) {
    messageNoResoults.classList.remove('hidden');
  } else {
    messageNoResoults.classList.add('hidden');
  }

  const card = images.data.results
    .map(image => {
      return `
      <li class="movie-item">
        <img class="boxID" alt="${image.title} movie poster" movieID=${image.id} movieTitle="${
        image.title
      } | ${
        isNaN(Number.parseInt(image.release_date))
          ? 'No year info'
          : Number.parseInt(image.release_date)
      }" src="https://image.tmdb.org/t/p/w500${image.poster_path}">
        <div class="info">
          <p class="info__title">
            <b>${image.title}</b>
          </p>
          <p class="info__genre">
            <b> ${image.genre_ids.map(element => idToGenere(element)).join(`, `)} | ${
        isNaN(Number.parseInt(image.release_date))
          ? 'No year info'
          : Number.parseInt(image.release_date)
      }
          </b></p>
        </div>
      </li>`;
    })
    .join('');
  listFilms.insertAdjacentHTML('beforeend', card.replaceAll('https://image.tmdb.org/t/p/w500null'));
  spinner.classList.add('hidden');
}

// wyszukiwanie filmów

function searchFilms(event) {
  event.preventDefault();
  const {
    elements: { searchQuery },
  } = event.currentTarget;
  searchMore = searchQuery.value;
  listFilms.innerHTML = '';

  {
    fetchSearchMovies(searchQuery.value, 1).then(response => {
      totalItems = response.data.total_results;
      pagination.reset(totalItems);
      renderFilms(response);
    });
  }
  const pagination = new Pagination(document.getElementById('tui-pagination-container'), {
    totalItems: totalItems,
    itemsPerPage: 20,
    visiblePages: 5,
    page: currentPage,
    centerAlign: false,

    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      disabledPage: '<span class="tui-page-btn tui-is-disabled">{{page}}</span>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  });

  pagination.on('afterMove', async function (eventData) {
    currentPage = eventData.page;
    const response = await fetchSearchMovies(searchQuery.value, currentPage);
    totalItems = response.total_results;
    listFilms.innerHTML = [] + [];
    renderFilms(response);
  });
}
searchForm.addEventListener('submit', searchFilms);

export { exportData, idToGenere };
