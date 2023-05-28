import { genreToString } from './genres';
import noImageFound from '../images/no-image.png';

export const listBuilder = moviesArray => {
  return moviesArray
    .map(item => {
      return `
      <li class="cover__container" id='${item.id}'>
      <img class="cover__image" src="${
        item.poster_path === null
          ? noImageFound
          : `https://image.tmdb.org/t/p/w500${item.poster_path}`
      }" alt="${item.title}/>
        <div class="cover__info">
          <p class="cover__figcaption">
            <b>${item.title}</b>
          </p>
          <p class="cover__figcaption-movie-data">
            <b> ${genreToString(item.genre_ids)} | ${new Date(item.release_date).getFullYear()}</b>
          </p>
        </div>
      </li>`;
    })
    .join('');
};
