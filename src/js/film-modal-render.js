const URL = 'https://api.themoviedb.org/3';
const KEY = 'cf961b1b89f4c4a28558be2b04fdd59a';

import {
  // fetchFilmsAPI,
  // fetchMoreFilmsAPI,
  // fetchMoreGenresAPI,
  fetchGenresAPI,
  fetchMovieInfoAPI
} from './film-api';

refs = {
  filmModalList: document.querySelector()
}

const openModalFilm = document.querySelector('.card-list');
console.log(openModalFilm);

const openFilmModalHandler = event => {
  if (event.target !== event.currentTarget){
    event.preventDefault();
    console.log(event.target);
const filmModalId = event.target.closest('.card-link').getAttribute('data-id');
    // console.log(event.target.closest('.card-link').getAttribute('data-id'));
    fetchMovieInfoAPI(filmModalId).then(data => {
      let markup = createModalMarkup(data);
      refs.filmModalList.insertAdjacentHTML('beforeend', markup);

    })
    
  }
}

openModalFilm.addEventListener('click', openFilmModalHandler);

function createModalMarkup(data) {
  console.log(data.id);
// return data({ id, title, poster_path, release_date, genre_ids }) => {
//   return `<div class="backdrop is-hidden" data-film-modal>
//   <div class="film-modal">
   
//     <h2 class="film-modal-title">${title}</h2>
    
//   <div class="film-modal-btn-wrap">
//     <button class="film-modal-btn film-modal-btn-watched add-to-watched-btn data-id="${id}" type="button">add to Watched</button>
//     <button class="film-modal-btn add-to-queue-btn" type="button" data-id="${id}">add to queue</button>
//   </div>
//   </div>
// </div>
// </div>`
// }
}


