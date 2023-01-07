const URL = 'https://api.themoviedb.org/3';
const KEY = 'cf961b1b89f4c4a28558be2b04fdd59a';

const refs = {
  filmModalList: document.querySelector('.backdrop'),
};

console.log(refs.filmModalList);

import {
  // fetchFilmsAPI,
  // fetchMoreFilmsAPI,
  // fetchMoreGenresAPI,
  //fetchGenresAPI,
  fetchMovieInfoAPI,
} from './film-api';

const openModalFilm = document.querySelector('.card-list');

const openFilmModalHandler = event => {
  if (event.target !== event.currentTarget) {
    event.preventDefault();
    const filmModalId = event.target
      .closest('.card-link')
      .getAttribute('data-id');

    fetchMovieInfoAPI(filmModalId).then(data => {
      let markup = createModalMarkupMovie(data);

      refs.filmModalList.innerHTML = markup;
      refs.filmModalList.classList.remove('is-hidden');
      const buttonCloseModal = document.querySelector(
        '.film-modal-close-button'
      );
      buttonCloseModal.addEventListener('click', closeModal);
      refs.filmModalList.addEventListener('click', closeModalBackdrop);
    });
  }
};

const closeModalEscape = event => {
  if (event.code === 'Escape') {
    closeModal();
  }
};

const closeModalBackdrop = event => {
  if (event.target.classList.contains('backdrop')) {
    closeModal();
  }
};

window.addEventListener('keydown', closeModalEscape);

openModalFilm.addEventListener('click', openFilmModalHandler);

const closeModal = () => {
  refs.filmModalList.classList.add('is-hidden');
  openModalFilm.removeEventListener('click', closeModal);
  refs.filmModalList.removeEventListener('click', closeModalBackdrop);
};

function createModalMarkupMovie(data) {
  console.log(data);
  const {
    id,
    title,
    overview,
    poster_path,
    release_date,
    genres,
    original_title,
    popularity,
    vote_average,
    vote_count,
  } = data;

  const basicImgURL = 'https://image.tmdb.org/t/p/w500';

  const genresMovie = data.genres.map(element => element.name).join(', ');

  return `<div class="film-modal">
      <button type="button" class="film-modal-close-button" data-film-modal-close> 
        <svg class='film-modal-close-icon' width='30' height='30' viewBox='0 0 30 30'>
          <path class='film-modal-close-icon' d='M8 8L22 22' stroke='black' stroke-width='2'></path>
          <path class='film-modal-close-icon' d='M8 22L22 8' stroke='black' stroke-width='2'></path>
        </svg>
      </button>
  
      <div class='film-modal-poster-wrap'>
        <img
          class='film-modal-poster-img'
          src="${basicImgURL}${poster_path}" alt="film"
        />
      </div>
      <div class="film-modal-info-wrap">
      <h2 class="film-modal-title">${title}</h2>
      <ul class="film-modal-info-list">
        <li class="film-modal-item ">
          <p class="film-modal-item-title">Vote / Votes</p>
          <p class="film-modal-item-description">
        <span class="film-modal-item-vote color">${vote_average}</span>
        <span>/</span>
        <span class="film-modal-item-vote">${vote_count}</span>
      </p>
      </li>
      <li class="film-modal-item ">
        <p class="film-modal-item-title">Popularity</p>
        <p class='film-modal-item-description'>${popularity}</p>
      </li>
      <li class="film-modal-item ">
        <p class="film-modal-item-title">Original Title</p>
        <p class="film-modal-item-description film-modal-item-original-title">${original_title}</p>
      </li>
      <li class="film-modal-item ">
        <p class="film-modal-item-title">Genre</p>
        <p class='film-modal-item-description'>${genresMovie}</p>
      </li>
    </ul>
    <h3 class="film-modal-about">ABOUT</h3>
    <p class="film-modal-description">${overview}
    </p>
    <div class="film-modal-btn-wrap">
      <button class="film-modal-btn film-modal-btn-watched add-to-watched-btn data-id="${id}" type="button">add to Watched</button>
      <button class="film-modal-btn add-to-queue-btn" type="button" data-id="${id}">add to queue</button>
    </div>
    </div>`;
}
