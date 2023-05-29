import * as basicLightbox from 'basiclightbox';
import { API_KEY, fetchTrailerById, BASE_URL } from './api';
import 'basiclightbox/dist/basicLightbox.min.css';
import { filmId } from './loading-into-trailer';

const srcTrailer = 'https://www.youtube.com/embed/';
const trailerBtn = document.querySelector('.trailer-btn');
const closeModalBtn = document.querySelector('.close-modal__trailer');

const closeModalHandler = e => {
  if (e.code === 'Escape') {
    modal.close();
  }
  window.removeEventListener('keydown', closeModalHandler);
};

trailerBtn.addEventListener('click', () => {
  openTrailer(filmId);
});

closeModalBtn.addEventListener('click', () => {
  closeModalHandler({ code: 'Escape' });
});

const modal = basicLightbox.create(`
  <div class="modal-content">
    <iframe class="iframe-container" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <button class="close-modal__trailer"></button>
  </div>
`);
const iframeTrailer = modal.element().querySelector('iframe');

export default function openTrailer(id) {
  fetchTrailerById(id)
    .then(data => {
      const key = data.results[0].key;
      const trailerURL = srcTrailer + key;
      
      iframeTrailer.src = trailerURL;
      modal.show();

      window.addEventListener('keydown', closeModalHandler);
    })
    .catch(error => {
      console.log(error);
    });
}