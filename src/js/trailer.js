import axios from 'axios';

const modal = document.querySelector('.modal');

export const fetchTrailer = async movieId => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=eaafeda4857b9c9fecdb45e75f22375a`,
    );
    const trailer = response.data.results.filter(elem => elem.name === 'Official Trailer');
    modal.innerHTML = '';
    modal.insertAdjacentHTML('beforeend', trailerDisplay(trailer[0].key));
    console.log(trailer);
  } catch (err) {
    console.log(err);
  }
};

export const trailerDisplay = movieKey => {
  return `
  <iframe 
  src="https://www.youtube.com/embed/${movieKey}" 
  scrolling="no" 
  frameborder="0" 
  allowfullscreen
  class="modal__iframe">
  </iframe>`;
};
