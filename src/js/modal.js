export { Modal };
import axios from 'axios';
const filmImg = document.querySelector('.card-film__film-img');
const filmInfo = document.querySelector('.card-film__film-desc');
const cardFilm = document.querySelector('.cover__container');
const showModal = document.querySelector('.backdrop');
const closeBtn = document.querySelector('.modal__btn');

window.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !showModal.classList.value.includes('is-hidden')) {
    toggleModal();
  }
});
closeBtn.addEventListener('click', () => {
  toggleModal();
});

showModal.addEventListener('click', () => {
  showModal.classList.add('is-hidden');
});

cardFilm.addEventListener('click', event => {
  const id = event.target.parentNode.id;
  fetchFilmInfo(id);
  toggleModal();
});

function toggleModal() {
  showModal.classList.toggle('is-hidden');
}

const fetchInfo = async id => {
  try {
    const API_KEY = 'eaafeda4857b9c9fecdb45e75f22375a';
    const array = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
    const response = await array.data;
    return response;
  } catch (error) {
    console.error(error);
  }
};

const fetchFilmInfo = async id => {
  Modal(await fetchInfo(id));
};

function getModalFilmImg(data) {
  return `<img class="card-film__img"
    src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="alt"
    loading="lazy">`;
}

function removeEventListener() {
  cardFilm.removeEventListener('click', event => {
    const id = event.target.parentNode.id;
    fetchFilmInfo(id);
    toggleModal();
  });
  closeBtn.removeEventListener('click', () => {
    toggleModal();
  });
  showModal.removeEventListener('click', () => {
    toggleModal();
  });
  window.removeEventListener('keydown', event => {
    if (event.key === 'Escape' && !showModal.classList.value.includes('is-hidden')) {
      toggleModal();
    }
  });
}

function getModalFilmInfo(data) {
  return `<ul class="card-film__list">
     <li>
       <h2 class="card-film__title">${data.title}</h2>
    </li>
    <li class="card-film__properties">
       <table class="card-film__table">
            <tbody>
                <tr>
                    <td class="card-film__table__propery">Vote / Votes</td>
                    <td class="card-film__table__value"><span
                        class="card-film__table__rate">${data.vote_average.toFixed(2)}</span> / ${
    data.vote_count
  }</td>
                </tr>
                <tr>
                    <td class="card-film__table__propery">Popularity</td>
                    <td class="card-film__table__value">${data.popularity}</td>
                </tr>
                <tr>
                    <td class="card-film__table__propery">Original Title</td>
                    <td class="card-film__table__value">${data.original_title}</td>
                </tr>
                <tr>
                    <td class="card-film__table__propery">Genre</td>
                    <td class="card-film__table__value">${data.genres
                      .map(genre => genre.name)
                      .join(', ')}</td>
                </tr>
            </tbody>
        </table>
    </li>
    <li>
        <p class="card-film__list__desc__title">About</p>
        <p class="card-film__list__desc">${data.overview}</p>
           </li>
           </ul>`;
}

const Modal = data => {
  filmImg.innerHTML = '';
  filmInfo.innerHTML = '';
  filmImg.innerHTML = getModalFilmImg(data);
  filmInfo.innerHTML = getModalFilmInfo(data);
  removeEventListener();
};
