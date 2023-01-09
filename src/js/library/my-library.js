import { fetchMovieInfoAPI } from '../film-api';
import {
    activateWatchedBtn,
    activateQueueBtn,
    deactiveWatchedBtn,
    deactivateQueueBtn,
} from './library-buttons-activate';
import { isMovieInWatched, isMovieInQueue } from './from-local-storage-info';

const IF_LIBRARY_EMPTY_IMG = 'image class="message-image" src="https://i.imgur.com/Ud8xgso.gif"/>';

const library = document.querySelector('.library');
const watchedBtn = document.querySelector('.button-container__watched');
const queueBtn = document.querySelector('.button-container__queu');
const message = document.querySelector('.message');

let watchedMovies = isMovieInWatched();
let queueMovies = isMovieInQueue();

if (
    (watchedMovies == null || watchedMovies.length === 0) &&
    (queueMovies == null || queueMovies.length === 0)
) {
    message.innerHTML = `<p class="message-text">You library is empty yet</p>${IF_LIBRARY_EMPTY_IMG}`;
    library.innerHTML = '';
} else if (watchedMovies.length > 0) {
    activateWatchedBtn();
    renderLibrary(watchedMovies);
} else if (queueMovies.length > 0) {
    activateQueueBtn();
    renderLibrary(queueMovies);
}

function renderLibrary(movies) {
    for (let i = 0; i < movies.length; i += 1)
        fetchMovieInfoAPI(filmModalId).then(data => {
            library.insertAdjacentHTML('beforeend', createLibraryMovieItem(data));
        })
    }

const onWatchedBtnClick = (event) => {
    deactivateQueueBtn();
    activateWatchedBtn();
    clearLibrary();

    watchedMovies = isMovieInWatched();

    if (watchedMovies == null || watchedMovies.length === 0) {
        message.innerHTML = `<p class="message-text">Your watched list is empty yet</p>${IF_LIBRARY_EMPTY_IMG}`;
        library.innerHTML = '';
    } else if (watchedMovies.length > 0) {
        library.innerHTML = '';
        renderLibrary(watchedMovies);
    }
};


const onQueueBtnClick = (event) => {
    activateQueueBtn();
    deactiveWatchedBtn();
    clearLibrary();

    queueMovies = isMovieInQueue();

    if (queueMovies == null || queueMovies.length === 0) {
        message.innerHTML = `<p class="message-text">Your queue list is empty yet</p>${IF_LIBRARY_EMPTY_IMG}`;
        library.innerHTML = '';
    } else if (queueMovies.length > 0) {
        library.innerHTML = '';
        renderLibrary(queueMovies);
    }
};

function clearLibrary() {
    library.innerHTML = '';
}

function createLibraryMovieItem(data, genres_names) {
  if (data.length === 0) {
    return;
  }
  return data
    .map(({ id, title, poster_path, release_date, genre_ids }) => {
      let release = release_date.slice(0, 4);
      let genres = [];
      for (let genre_id of genre_ids) {
        let genre = genres_names.find(({ id }) => id === genre_id);
        genres.push(genre.name);
      }
      if (genres.length >= 3) {
        genres = [genres[0], genres[1], 'Other'];
      }
      let genres_str = genres.join(', ');
      return `<li class="card">
  <a href="" class="card-link link" data-id="${id}">
    <img class="card-img" src="${basicImgURL}${poster_path}" alt="${title}">
    <h3 class="card-name">${title}</h3>
    <div class="card-item">
      <p class="card-genres">${genres_str}</p>
      <p class="card-year"><span class="card-line">|</span>${release}</p>
    </div>
  </a>
</li>`;
    })
    .join('');
}


watchedBtn.addEventListener('click', onWatchedBtnClick);
queueBtn.addEventListener('click', onQueueBtnClick);



// треба описати клас is-active для кнопок