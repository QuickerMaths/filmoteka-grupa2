export function addToWatched(data, watchButton) {
  const movieDetailsToSave = {
    title: data.title,
    id: data.id,
    release_date: data.release_date,
    genre_ids: data.genres.map(genre => genre.id),
    poster_path: data.poster_path,
    vote: data.vote_average.toFixed(1),
    popularity: data.popularity.toFixed(1),
    org_title: data.original_title,
    about: data.overview,
  };

  watchButton.innerHTML = 'ADDED TO WATCHED';
  watchButton.classList.add('btn-mod-color');

  const watched = localStorage.getItem('WATCH_KEY');

  if (!watched) {
    localStorage.setItem('WATCH_KEY', JSON.stringify([movieDetailsToSave]));
    return;
  }

  const savedMovies = JSON.parse(watched);

  if (watched.includes(data.id)) {
    watchButton.innerHTML = 'ADD TO WATCHED';
    watchButton.classList.remove('btn-mod-color');
    localStorage.setItem(
      'WATCH_KEY',
      JSON.stringify(savedMovies.filter(movie => movie.id !== data.id)),
    );
    return;
  } else {
    localStorage.setItem('WATCH_KEY', JSON.stringify([...savedMovies, movieDetailsToSave]));
  }
}

export function addToQueued(data, queueButton) {
  const movieDetailsToSave = {
    title: data.title,
    id: data.id,
    release_date: data.release_date,
    genre_ids: data.genres.map(genre => genre.id),
    poster_path: data.poster_path,
    vote: data.vote_average.toFixed(1),
    popularity: data.popularity.toFixed(1),
    org_title: data.original_title,
    about: data.overview,
  };

  queueButton.innerHTML = 'ADDED TO QUEUE';
  queueButton.classList.add('btn-mod-color');

  const queued = localStorage.getItem('QUEUE_KEY');

  if (!queued) {
    localStorage.setItem('QUEUE_KEY', JSON.stringify([movieDetailsToSave]));
    return;
  }

  const savedMovies = JSON.parse(queued);

  if (queued.includes(data.id)) {
    queueButton.innerHTML = 'ADD TO QUEUE';
    queueButton.classList.remove('btn-mod-color');
    localStorage.setItem(
      'QUEUE_KEY',
      JSON.stringify(savedMovies.filter(movie => movie.id !== data.id)),
    );
    return;
  } else {
    localStorage.setItem('QUEUE_KEY', JSON.stringify([...savedMovies, movieDetailsToSave]));
  }
}
