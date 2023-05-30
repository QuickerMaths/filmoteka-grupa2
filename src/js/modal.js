import axios from 'axios';
import { addToQueued, addToWatched } from './localStorage';
import { displayLoading, hideLoading } from './loader';
import noImageFound from '../images/no-image.png';
import { fetchTrailer } from './trailer';

const moviesContainer = document.getElementById('movies-container');
const modal = document.querySelector('.modal');
const backdrop = document.querySelector('.backdrop');
const wrapper = document.querySelector('.modal-wrapper');

const API_KEY = 'eaafeda4857b9c9fecdb45e75f22375a';

const fetchInfo = async id => {
  displayLoading();
  try {
    const movieData = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
    );
    Modal(movieData.data);
    toggleModal();
  } catch (error) {
    console.error(error);
  }
  hideLoading();
};

const getModalFilmInfo = data => {
  return `
  <button class="modal__close-btn">
      <svg viewBox="0 0 30 30" class="modal__close-btn--svg" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 8L22 22" class="modal__close-btn--path" />
        <path d="M8 22L22 8" class="modal__close-btn--path" />
      </svg>
    </button>
    <div class="modal__img-container">
    <button class="modal__trailer-button">
      <svg class="modal__svg-trailer" fill="#ffffff" height="75px" width="75px" version="1.1" id="icon-play" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	      viewBox="0 0 60 60" xml:space="preserve">
        <g>
	      <path d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30
		      c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15
		      C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z"/>
	      <path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30
		      S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"/>
        </g>
      </svg>
    </button>
  <img class="modal__img" 
    src="${
      data.poster_path === null
        ? noImageFound
        : `https://image.tmdb.org/t/p/w500${data.poster_path}`
    }" alt="alt"
    loading="lazy"> 
    </div>
  <ul class="modal__list">
     <li>
       <h2 class="modal__title">${data.title}</h2>
    </li>
    <li class="modal__properties">
       <table class="modal__table">
            <tbody>
                <tr>
                    <td class="modal__table__propery">Vote / Votes</td>
                    <td class="modal__table__value"><span
                        class="modal__table__rate">${data.vote_average.toFixed(2)}</span> / ${
    data.vote_count
  }</td>
                </tr>
                <tr>
                    <td class="modal__table__propery">Popularity</td>
                    <td class="modal__table__value">${data.popularity}</td>
                </tr>
                <tr>
                    <td class="modal__table__propery">Original Title</td>
                    <td class="modal__table__value">${data.original_title}</td>
                </tr>
                <tr>
                    <td class="modal__table__propery">Genre</td>
                    <td class="modal__table__value">${data.genres
                      .map(genre => genre.name)
                      .join(', ')}</td> 
                </tr>
            </tbody>
        </table>
    </li>
    <li>
      <p class="modal__list__desc__title">About</p>
      <p class="modal__list__desc">${data.overview}</p>
    </li>
    <li>
      <div class="modal__btn-container mod--buttons">
        <button type="button" class="modal__btn modal__btn-watch">add to watched</button>
        <button type="button" class="modal__btn modal__btn-queue">add to queue</button>
      </div>
    </li>
  </ul>`;
};

const Modal = data => {
  modal.innerHTML = '';
  modal.innerHTML = getModalFilmInfo(data);
  if (localStorage.getItem('WATCH_KEY') || localStorage.getItem('QUEUE_KEY')) {
    checkIfInLocalStorage(data);
  }
  modal.addEventListener('click', event => {
    if (
      event.target.classList.contains('modal__close-btn') ||
      event.target.classList.contains('modal__close-btn--svg')
    ) {
      toggleModal();
      removeEventListener();
    }
    if (event.target.classList.contains('modal__btn-watch')) {
      addToWatched(data, event.target);
    }
    if (event.target.classList.contains('modal__btn-queue')) {
      addToQueued(data, event.target);
    }
    if (
      event.target.classList.contains('modal__trailer-button') ||
      event.target.classList.contains('modal__svg-trailer')
    ) {
      fetchTrailer(data.id);
    }
  });
};

window.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !backdrop.classList.value.includes('is-hidden')) {
    toggleModal();
  }
});

moviesContainer.addEventListener('click', event => {
  fetchInfo(event.target.parentNode.id);
});

backdrop.addEventListener('click', () => {
  toggleModal();
  removeEventListener();
});

function toggleModal() {
  backdrop.classList.toggle('is-hidden');
  modal.classList.toggle('is-hidden');
  wrapper.classList.toggle('is-hidden');
}

function removeEventListener() {
  moviesContainer.removeEventListener('click', event => {
    fetchInfo(event.target.parentNode.id);
  });
  backdrop.removeEventListener('click', () => {
    toggleModal();
    removeEventListener();
  });
  window.removeEventListener('keydown', event => {
    if (event.key === 'Escape' && !showModal.classList.value.includes('is-hidden')) {
      toggleModal();
      removeEventListener();
    }
  });
  modal.removeEventListener('click', event => {
    if (
      event.target.classList.contains('modal__close-btn') ||
      event.target.classList.contains('modal__close-btn--svg')
    ) {
      toggleModal();
      removeEventListener();
    }
    if (event.target.classList.contains('modal__btn-watch')) {
      addToWatched(data, event.target);
    }
    if (event.target.classList.contains('modal__btn-queue')) {
      addToQueued(data, event.target);
    }
    if (event.target.classList.contains('modal__trailer-button')) {
      fetchTrailer(data.id);
    }
  });
}

function checkIfInLocalStorage(data) {
  const watched = JSON.parse(localStorage.getItem('WATCH_KEY'));
  const queued = JSON.parse(localStorage.getItem('QUEUE_KEY'));

  if (watched) {
    const watchedIds = watched.map(item => item.id);
    if (watchedIds.includes(data.id)) {
      modal.querySelector('.modal__btn-watch').textContent = 'ADDED TO WATCHED';
      modal.querySelector('.modal__btn-watch').classList.add('btn-mod-color');
    }
  }

  if (queued) {
    const queuedIds = queued.map(item => item.id);
    if (queuedIds.includes(data.id)) {
      modal.querySelector('.modal__btn-queue').textContent = 'ADDED TO QUEUED';
      modal.querySelector('.modal__btn-queue').classList.add('btn-mod-color');
    }
  }
}
