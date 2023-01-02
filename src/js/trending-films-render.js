import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

import { fetchFilmsAPI, fetchMoreFilmsAPI, fetchGenresAPI } from './film-api';

export { createCardMarkup };

const refs = {
  movieList: document.querySelector('.card-list'),
  pagination: document.querySelector('.tui-pagination'),
};

const options = {
  totalItems: 0,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

const pagination = new Pagination(refs.pagination, options);
const page = pagination.getCurrentPage();

const basicImgURL = 'https://image.tmdb.org/t/p/w500';

fetchFilmsAPI(page).then(data => {
  refs.movieList.insertAdjacentHTML('beforeend', createCardMarkup(data));
});

pagination.on('afterMove', fetchMoreFilmsAPI);

function createCardMarkup(data) {
  if (data.length === 0) {
    return;
  }
  return data
    .map(({ title, poster_path, release_date, genre_ids }) => {
      let release = release_date.slice(0, 4);
      let genres = [];
      for (let object of genre_ids) {
        genres.push(object);
      }
      if (genres.length >= 3) {
        genres = [genres[0], genres[1], 'Other'];
      }
      return `<li class="card">
  <a href="" class="card-link link">
    <img class="card-img" src="${basicImgURL}${poster_path}" alt="${title}">
    <h3 class="card-name">${title}</h3>
    <div class="card-item">
      <p class="card-genres">${genres}</p>
      <p class="card-year"><span class="card-line">|</span>${release}</p>
    </div>
  </a>
</li>`;
    })
    .join('');
}
