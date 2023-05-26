import './sass/main.scss';
import {
  moviesContainer,
  listBuilder,
  getmoviesArray,
  getGenresArray,
  getDataFromAPI,
} from './js/movies-list';
import { Modal } from './js/modal';
import { displayLoading, hideLoading } from './js/loader';
import './js/search';
import { userSignUp, userSignIn, userSignOut, checkAuthState } from './js/firebase';
