import {
  fetchGenresAPI,
  fetchMovieInfoAPI
} from './film-api';

const URL = 'https://api.themoviedb.org/3';
const KEY = 'cf961b1b89f4c4a28558be2b04fdd59a';
const basicImgURL = 'https://image.tmdb.org/t/p/w500';

refs = {
  openModalFilm: document.querySelector('.card-list'),
  filmModalList: document.querySelector('.section'),
  modal: document.querySelector('[data-film-modal]'),
  closeModalBtn: document.querySelector('[data-film-modal-close]'),

}
console.log(refs.filmModalList);

console.log(refs.openModalFilm);

const openFilmModalHandler = event => {
  if (event.target !== event.currentTarget){
    event.preventDefault();
    console.log(event.target);
const filmModalId = event.target.closest('.card-link').getAttribute('data-id');
    fetchMovieInfoAPI(filmModalId).then(data => {
      let markup = createModalMarkup(data);
      refs.filmModalList.insertAdjacentHTML('beforeend', markup);

    })
    
  }
}

refs.openModalFilm.addEventListener('click', openFilmModalHandler);

// let {id, poster_path, genres, title, vote_average, vote_count, popularity, original_title, overview} = movie;


function createModalMarkup(data) {
console.log(data.id);

return data
.map(({id, poster_path, genres, title, vote_average, vote_count, popularity, original_title, overview}) => {

return  `<div class="backdrop is-hidden" data-film-modal>
<div class="film-modal">
  <button type="button" class="film-modal-close-button" data-film-modal-close> 
    <svg class='film-modal-close-icon' width='30' height='30' viewBox='0 0 30 30'>
      <path class='film-modal-close-icon' d='M8 8L22 22' stroke='black' stroke-width='2'></path>
      <path class='film-modal-close-icon' d='M8 22L22 8' stroke='black' stroke-width='2'></path>
    </svg>
  </button>

  <div class='film-modal-poster-wrap'>
    <img
      class='film-modal-poster-img'
      src="${basicImgURL}${poster_path}"  alt=${title}
    />
  </div>
  <div class="film-modal-info-wrap">
  <h2 class="film-modal-title">${title}</h2>
  <ul class="film-modal-info-list">
    <li class="film-modal-item ">
      <p class="film-modal-item-title">Vote / Votes</p>
      <p class="film-modal-item-description">
    <span class="film-modal-item-vote color">${vote_average}</span>
    
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
    <p class='film-modal-item-description'>${genres} </p>
  </li>
</ul>
<h3 class="film-modal-about">ABOUT</h3>
<p class="film-modal-description">${overview}
</p>
<div class="film-modal-btn-wrap">
  <button class="film-modal-btn film-modal-btn-watched add-to-watched-btn data-id="${id}" type="button">add to Watched</button>
  <button class="film-modal-btn add-to-queue-btn" type="button" data-id="${id}">add to queue</button>
</div>
</div>
</div>
</div>`}
)

//to add for modal window close:


refs.closeModalBtn.addEventListener('click', toggleModal);
function toggleModal() {
refs.modal.classList.toggle('is-hidden');
};
document.addEventListener('keydown', function(e) {
if (e.key === 'Escape') {
toggleModal()
}})

refs.modal.addEventListener('click', (e) => {

  if (e.target === refs.modal) {
    toggleModal();
  }
});

//--to reduce all listeners--

// function cleanHTML() {
//   openModalFilm.innerHTML = '';
//   filmModalList.innerHTML = '';
//   modal.innerHTML = '';
//   closeModalBtn.innerHTML = '';
// }
}















