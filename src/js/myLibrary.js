const listFilms = document.querySelector('.movies-list');
const messageNoMovies = document.querySelector('.movie__container');

function renderFilmsWatched(parsedWatched) {
  listFilms.innerHTML = '';
  const parsed = JSON.parse(localStorage.getItem('WATCH_KEY'));
  if (parsed === null || parsed === 0 || parsed.length < 1) {
    messageNoMovies.classList.remove('hidden');
    return;
  }
  messageNoMovies.classList.add('hidden');
  const card = parsed
    .map(image => {
      return `
      <li class="movie-item">
        <img class="boxID" alt="${image.title} movie poster" movieID="${image.id}" movieTitle="${image.title} ${image.releaseDate}" src="${image.poster}">
        <div class="info">
          <p class="info__title">
            <b>${image.title}</b>
          </p>
          <p class="info__genre">
            <b> ${image.genres} | ${image.releaseDate}</b>
          </p>
        </div>
      </li>`;
    })
    .join('');
  listFilms.innerHTML = card;
}

function renderFilmsQueued(parsedQueued) {
  listFilms.innerHTML = '';
  const parsed2 = JSON.parse(localStorage.getItem('QUEUE_KEY'));
  if (parsed2 === null || parsed2 === 0 || parsed2.length < 1) {
    messageNoMovies.classList.remove('hidden');
    return;
  }
  messageNoMovies.classList.add('hidden');
  const card = parsed2
    .map(image => {
      return `
        <li class="movie-item">
          <img class="boxID" alt="${image.title} movie poster" movieID="${image.id}" movieTitle="${image.title} ${image.releaseDate}" src="${image.poster}">
          <div class="info">
            <p class="info__title">
              <b>${image.title}</b>
            </p>
            <p class="info__genre">
              <b> ${image.genres} | ${image.releaseDate}</b>
            </p>
          </div>
        </li>`;
    })
    .join('');
  listFilms.innerHTML = card;
}

const watchedBtn = document.querySelector('#watched-btn');
const queueBtn = document.querySelector('#queue-btn');

watchedBtn.addEventListener('click', () => {
  watchedBtn.setAttribute('disabled', '');
  queueBtn.removeAttribute('disabled');
  watchedBtn.classList.add('active');
  queueBtn.classList.remove('active');
  renderFilmsWatched();
});

queueBtn.addEventListener('click', () => {
  queueBtn.setAttribute('disabled', '');
  watchedBtn.removeAttribute('disabled');
  queueBtn.classList.add('active');
  watchedBtn.classList.remove('active');
  renderFilmsQueued();
});

const libStart = () => {
  const parsed = JSON.parse(localStorage.getItem('WATCH_KEY'));
  if (parsed === null || parsed === 0 || parsed.length < 1) {
    messageNoMovies.classList.remove('hidden');
  }
  watchedBtn.setAttribute('disabled', '');
  queueBtn.removeAttribute('disabled');
  watchedBtn.classList.add('active');
  queueBtn.classList.remove('active');
  renderFilms();
};
libStart();
