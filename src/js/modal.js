import axios from 'axios';

const moviesContainer = document.getElementById('movies-container');
const modal = document.querySelector('.modal');
const showModal = document.querySelector('.backdrop');

const API_KEY = 'eaafeda4857b9c9fecdb45e75f22375a';

window.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !showModal.classList.value.includes('is-hidden')) {
    toggleModal();
  }
});

moviesContainer.addEventListener('click', event => {
  fetchInfo(event.target.parentNode.id);
});

showModal.addEventListener('click', () => {
  document.querySelector('.modal__close-btn').addEventListener('click', () => {
    toggleModal();
  });
});

const fetchInfo = async id => {
  try {
    const movieData = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
    );
    Modal(movieData.data);
    toggleModal();
  } catch (error) {
    console.error(error);
  }
};

function getModalFilmInfo(data) {
  return `
  <button class="modal__close-btn">
      <svg viewBox="0 0 30 30" class="modal__close-btn--svg" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 8L22 22" class="modal__close-btn--path" />
        <path d="M8 22L22 8" class="modal__close-btn--path" />
      </svg>
    </button>
  <img class="modal__img"
    src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="alt"
    loading="lazy">
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
    </div></li>
           </ul>`;
}

const Modal = data => {
  modal.innerHTML = '';
  modal.insertAdjacentHTML('beforeend', getModalFilmInfo(data));
  removeEventListener();
};

function removeEventListener() {
  moviesContainer.removeEventListener('click', event => {
    fetchInfo(event.target.parentNode.id);
  });
  showModal.removeEventListener('click', () => {
    document.querySelector('.modal__close-btn').addEventListener('click', () => {
      toggleModal();
    });
  });
  window.removeEventListener('keydown', event => {
    if (event.key === 'Escape' && !showModal.classList.value.includes('is-hidden')) {
      toggleModal();
    }
  });
}

function toggleModal() {
  showModal.classList.toggle('is-hidden');
}
