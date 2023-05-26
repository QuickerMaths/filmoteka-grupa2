export const listBuilder = moviesArray => {
  moviesContainer.innerHTML = moviesArray
    .map(item => {
      return `<li class="covers__container">
        <img class="cover__image" src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${item.title}">
        <h3 class="cover__figcaption-title">${item.title}</h3>
        <p class="cover__figcaption-movie-data">${item.release_date}</p>
        <button class="btn">More Info</button>
      </li>`;
    })
    .join('');
};
