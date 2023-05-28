import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import axios from 'axios';
import { listBuilder } from './movies-list-builder';

const moviesContainer = document.getElementById('movies-container');

let currentPage = 1;
let totalItems = 0;

const options = {
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
};

export const pagination = new Pagination(
  document.getElementById('tui-pagination-container'),
  options,
);

export async function onPaginationClick(page, url, searchParam = '') {
  moviesContainer.innerHTML = '';
  try {
    const response = await axios.get(
      `${url}?api_key=eaafeda4857b9c9fecdb45e75f22375a&query=${searchParam}&page=${page}}`,
    );
    moviesContainer.insertAdjacentHTML('beforeend', listBuilder(response.data.results));
  } catch (err) {
    console.log(err);
  }
}
