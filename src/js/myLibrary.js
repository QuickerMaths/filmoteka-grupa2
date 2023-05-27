import { listBuilder } from './movies-list-builder.js';

const moviesContainer = document.getElementById('movies-container');
// const messageNoMovies = document.querySelector('.movie__container');

function renderFilmsWatched() {
  moviesContainer.innerHTML = '';
  const parsed = JSON.parse(localStorage.getItem('WATCH_KEY'));
  // if (parsed === null || parsed.length === 0) {
  //   messageNoMovies.classList.remove('hidden');
  //   return;
  // }
  // messageNoMovies.classList.add('hidden');

  moviesContainer.insertAdjacentHTML('beforeend', listBuilder(parsed));
}

function renderFilmsQueued() {
  moviesContainer.innerHTML = '';
  const parsed2 = JSON.parse(localStorage.getItem('QUEUE_KEY'));
  // if (parsed2 === null || parsed2.length === 0) {
  //   messageNoMovies.classList.remove('hidden');
  //   return;
  // }
  // messageNoMovies.classList.add('hidden');

  moviesContainer.insertAdjacentHTML('beforeend', listBuilder(parsed2));
}

const watchedBtnHeader = document.querySelector('#watched-btn');
const queueBtnHeader = document.querySelector('#queue-btn');

watchedBtnHeader.addEventListener('click', () => {
  toggleLibButtons();
  renderFilmsWatched();
});

queueBtnHeader.addEventListener('click', () => {
  toggleLibButtons();
  renderFilmsQueued();
});

export const libStart = () => {
  const parsed = JSON.parse(localStorage.getItem('WATCH_KEY'));
  // if (parsed === null || parsed.length === 0) {
  //   messageNoMovies.classList.remove('hidden');
  // }
  renderFilmsWatched();
};

function toggleLibButtons() {
  watchedBtnHeader.classList.toggle('header__button--active');
  queueBtnHeader.classList.toggle('header__button--active');
  watchedBtnHeader.toggleAttribute('disabled');
  queueBtnHeader.toggleAttribute('disabled');
}
