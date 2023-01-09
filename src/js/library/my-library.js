
import {
    fetchFilmsAPI,
    fetchMoreFilmsAPI,
    fetchMoreGenresAPI,
    fetchGenresAPI,
    fetchMovieInfoAPI,
    fetchFilmsSearch,
  } from '../film-api';

import { isMovieInWatched, isMovieInQueue } from './from-local-storage-info';

const IF_LIBRARY_EMPTY_IMG = '<image class="message-image" src="https://i.imgur.com/Ud8xgso.gif"/>';

const library = document.querySelector('.library');
const watchedBtn = document.querySelector('.button-container__watched');
const queueBtn = document.querySelector('.button-container__queu');
const message = document.querySelector('.message');

let watchedMovies = isMovieInWatched();
let queueMovies = isMovieInQueue();

console.log(watchedMovies)

if (
    (watchedMovies == null || watchedMovies.length === 0) &&
    (queueMovies == null || queueMovies.length === 0)
) {
    message.innerHTML = `<p class="message-text">You library is empty yet</p>${IF_LIBRARY_EMPTY_IMG}`;
    library.innerHTML = '';
} else if (watchedMovies.length > 0) {
    watchedBtn.classList.add('is-active');
    renderLibrary(watchedMovies);
} else if (queueMovies.length > 0) {
    queueBtn.classList.add('is-active');
    renderLibrary(queueMovies);
}

function renderLibrary(movies) {
    console.log(movies)
    for (let i = 0; i < movies.length; i += 1) {
    console.log(movies[i])
        fetchMovieInfoAPI(movies[i]).then(data => {
           
            library.insertAdjacentHTML('beforeend', createLibraryMovieItem(data));
        })
    }
    }

const onWatchedBtnClick = (event) => {
    queueBtn.classList.remove('is-active');
    watchedBtn.classList.add('is-active');
    clearLibrary();

    watchedMovies = isMovieInWatched();

    if (watchedMovies == null || watchedMovies.length === 0) {
        message.innerHTML = `<p class="message-text">Your watched list is empty yet</p>${IF_LIBRARY_EMPTY_IMG}`;
        library.innerHTML = '';
    } else if (watchedMovies.length > 0) {
        library.innerHTML = '';
        message.innerHTML = '';
        renderLibrary(watchedMovies);
    }
};


const onQueueBtnClick = (event) => {
    queueBtn.classList.add('is-active');
    watchedBtn.classList.remove('is-active');
    clearLibrary();

    queueMovies = isMovieInQueue();

    if (queueMovies == null || queueMovies.length === 0) {
        message.innerHTML = `<p class="message-text">Your queue list is empty yet</p>${IF_LIBRARY_EMPTY_IMG}`;
        library.innerHTML = '';
    } else if (queueMovies.length > 0) {
        library.innerHTML = '';
        message.innerHTML = '';
        renderLibrary(queueMovies);
    }
};

function clearLibrary() {
    library.innerHTML = '';
}

function createLibraryMovieItem(data) {
    console.log(data)
  if ((watchedMovies == null || watchedMovies.length === 0) &&
  (queueMovies == null || queueMovies.length === 0)) {
    return;
  } 
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

      return `
      <li class="card">
  <a href="" class="card-link link" data-id="${id}">
    <img class="card-img" src="${basicImgURL}${poster_path}" alt="${title}">
    <h3 class="card-name">${title}</h3>
    <div class="card-item">
      <p class="card-genres">${genresMovie}</p>
      <p class="card-year"><span class="card-line">|</span>${release_date}</p>
    </div>
  </a>
</li>
      `;
    }

watchedBtn.addEventListener('click', onWatchedBtnClick);
queueBtn.addEventListener('click', onQueueBtnClick);



// треба описати клас is-active для кнопок