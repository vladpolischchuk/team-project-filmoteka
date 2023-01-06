const URL = 'https://api.themoviedb.org/3';
const KEY = 'cf961b1b89f4c4a28558be2b04fdd59a';

refs = {
  filmModalList: document.querySelector('.backdrop'),
};

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
      console.log(refs.filmModalList);
      refs.filmModalList.innerHTML = markup;
      refs.filmModalList.classList.remove('is-hidden');
      const buttonCloseModal = document.querySelector(
        '.film-modal-close-button'
      );
      buttonCloseModal.addEventListener('click', closeModal);
    });
  }
};

openModalFilm.addEventListener('click', openFilmModalHandler);

const closeModal = () => {
  refs.filmModalList.classList.add('is-hidden');
  openModalFilm.removeEventListener('click', closeModal);
};

function createModalMarkupMovie(data) {
  console.log(data);
  const {
    id,
    title,
    poster_path,
    release_date,
    genre_ids,
    vote_average,
    vote_count,
  } = data;

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
          src="/src/img/film-modal-temporary/temporary-img.png" alt="film"
        />
      </div>
      <div class="film-modal-info-wrap">
      <h2 class="film-modal-title">${title}</h2>
      <ul class="film-modal-info-list">
        <li class="film-modal-item ">
          <p class="film-modal-item-title">Vote ${vote_count}</p>
          <p class="film-modal-item-description">
        <span class="film-modal-item-vote color">${vote_average}</span>
        
        <span class="film-modal-item-vote">back-end</span>
      </p>
      </li>
      <li class="film-modal-item ">
        <p class="film-modal-item-title">Popularity</p>
        <p class='film-modal-item-description'>back-end</p>
      </li>
      <li class="film-modal-item ">
        <p class="film-modal-item-title">Original Title</p>
        <p class="film-modal-item-description film-modal-item-original-title">back-end</p>
      </li>
      <li class="film-modal-item ">
        <p class="film-modal-item-title">Genre</p>
        <p class='film-modal-item-description'>back-end</p>
      </li>
    </ul>
    <h3 class="film-modal-about">ABOUT</h3>
    <p class="film-modal-description">Four of the West’s most infamous outlaws assemble 
      to steal a huge stash of gold from the most corrupt settlement of the gold rush towns.
      But not all goes to plan one is killed and the other three escapes with bags of gold hide out in the abandoned
      gold mine where they happen across another gang of three – who themselves were planning 
      to hit the very same bank! As tensions rise, things go from bad to worse as they realise the 
      bags of gold are filled with lead... they’ve been double crossed – but by who and how?
    </p>
    <div class="film-modal-btn-wrap">
      <button class="film-modal-btn film-modal-btn-watched add-to-watched-btn data-id="${id}" type="button">add to Watched</button>
      <button class="film-modal-btn add-to-queue-btn" type="button" data-id="${id}">add to queue</button>
    </div>
    </div>`;
}
