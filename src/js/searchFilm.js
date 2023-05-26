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
