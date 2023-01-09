const URL = 'https://api.themoviedb.org/3';
const KEY = 'cf961b1b89f4c4a28558be2b04fdd59a';

// const refs = {
//   filmModalList: document.querySelector('.backdrop'),
// };

import {
  // fetchFilmsAPI,
  // fetchMoreFilmsAPI,
  // fetchMoreGenresAPI,
  //fetchGenresAPI,
  fetchMovieInfoAPI,
} from './film-api';

const refs = {
  filmModalList: document.querySelector('.backdrop'),
  openModalFilm: document.querySelector('.card-list'),

}
console.log(refs)
refs.openModalFilm.addEventListener('click', openFilmModalHandler);

const scrollController = {
    disabledScroll(){
    document.body.style.cssText = `
    overflow: hidden;
    `;
    },
    enabledScroll(){
        document.body.style.cssText = '';
    }

}

function openFilmModalHandler(e) {
  if (e.target !== e.currentTarget) {
  e.preventDefault();
      const filmModalId = e.target
      .closest('.card-link')
      .getAttribute('data-id');
      console.log(filmModalId) 
  
      fetchMovieInfoAPI(filmModalId).then(data => {
        refs.filmModalList.classList.remove('is-hidden');
        refs.filmModalList.innerHTML = createModalMarkupMovie(data);
        const buttonCloseModal = document.querySelector('.film-modal-close-button');
        buttonCloseModal.addEventListener('click', closeModal);
        refs.filmModalList.addEventListener('click', closeModalBackdrop);
        
        scrollController.disabledScroll();
        
        const addToWatchedBtn = document.querySelector('.add-to-watched-btn');
let watchedMovies = JSON.parse(localStorage.getItem('Watched movies')) || [];
const isWatched = watchedMovies.includes(data.id);
if (isWatched) {
  addToWatchedBtn.textContent = 'Remove from watched';
} else {
  addToWatchedBtn.textContent = 'Add to watched';
}
addToWatchedBtn.addEventListener('click', onToWatchedBtnClick);

function onToWatchedBtnClick(event) {
  let watchedMovies = JSON.parse(localStorage.getItem('Watched movies')) || [];
  const isWatched = watchedMovies.includes(data.id);
  if (!isWatched) {
    watchedMovies.push(data.id);
    event.target.textContent = 'Remove from watched';

  } else {
    const movieIndex = watchedMovies.indexOf(data.id);
    watchedMovies.splice(movieIndex, 1);
    event.target.textContent = 'Add to watched';

  }
  localStorage.setItem('Watched movies', JSON.stringify(watchedMovies));
        }
        
        const addToQueueBtn = document.querySelector('.add-to-queue-btn');
let queueMovies = JSON.parse(localStorage.getItem('Queue movies')) || [];
const isQueue = queueMovies.includes(data.id);
if (isQueue) {
  addToQueueBtn.textContent = 'Remove from queue';
} else {
  addToQueueBtn.textContent = 'Add to queue';
}
addToQueueBtn.addEventListener('click', onToQueueBtnClick);

function onToQueueBtnClick(event) {
  let queueMovies = JSON.parse(localStorage.getItem('Queue movies')) || [];
  const isQueue = queueMovies.includes(data.id);
  if (!isQueue) {
    queueMovies.push(data.id);
    event.target.textContent = 'Remove from queue';

  } else {
    const movieIndex = queueMovies.indexOf(data.id);
    queueMovies.splice(movieIndex, 1);
    event.target.textContent = 'Add to queue';

  }
  localStorage.setItem('Queue movies', JSON.stringify(queueMovies));
}


      })
    
    }
}


function createModalMarkupMovie(data) {

  // console.log(data);
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
    homepage
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
          <a class='link link-watch film-modal-btn  js-film-trailer' href="${homepage}" data-id="${id}">official page</a>
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
        <button class="film-modal-btn film-modal-btn-watched add-to-watched-btn" data-id="${id}" type="button">add to Watched</button>
        <button class="film-modal-btn add-to-queue-btn" type="button" data-id="${id}">add to queue</button>
      </div>
      </div>`;
  }
  
  function closeModal() {
      refs.filmModalList.classList.add('is-hidden');
    //   openModalFilm.removeEventListener('click', closeModal);
      refs.filmModalList.removeEventListener('click', closeModalBackdrop);

      scrollController.enabledScroll();

    };

  function closeModalBackdrop(e) {
    console.log(e.target.classList)
      if (e.target.classList.contains('backdrop')) {
        closeModal();

      } 
    };

    const closeModalEscape = event => {
  if (event.code === 'Escape') {
    closeModal();

  }
};

window.addEventListener('keydown', closeModalEscape);