import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { createCardMarkup } from './trending-films-render';
import { preloader } from './preloader';

const URL = 'https://api.themoviedb.org/3';
const KEY = 'cf961b1b89f4c4a28558be2b04fdd59a';

const refs = {
  pagination: document.querySelector('.tui-pagination'),
  movieList: document.querySelector('.card-list'),
};

//EXPORT  FUNCTIONS
export {
  fetchFilmsAPI,
  fetchMoreFilmsAPI,
  fetchMoreGenresAPI,
  fetchGenresAPI,
  fetchMovieInfoAPI,
  fetchFilmsSearch,
};

// FETCH FOR MOVIE OF THE DAY
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

async function fetchFilmsAPI(page) {
  return await fetch(`${URL}/trending/movie/day?api_key=${KEY}&page=${page}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      return response.json();
    })
    .then(data => {
      pagination.reset(data.total_results);
      refs.pagination.classList.remove('pagination-is-hidden');

      return data.results;
    })
    .catch(error => {
      console.error(
        'There has been a problem with your fetch operation:',
        error
      );
    });
}

async function fetchMoreFilmsAPI(page) {
  return await fetch(`${URL}/trending/movie/day?api_key=${KEY}&page=${page}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      return response.json();
    })
    .then(data => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      return data.results;
    })
    .catch(error => {
      console.error(
        'There has been a problem with your fetch operation:',
        error
      );
    });
}

pagination.on('afterMove', fetchMoreGenresAPI);

async function fetchMoreGenresAPI(event) {
  const currentPage = event.page;

  fetchGenresAPI().then(genres => {
    fetchMoreFilmsAPI(currentPage).then(data => {
      let markup = createCardMarkup(data, genres);

      refs.movieList.innerHTML = '';
      refs.movieList.insertAdjacentHTML('beforeend', markup);
    });
  });
}

//FUNCTION CALL
//fetchFilmsAPI();

// FETCH FOR GENRE
async function fetchGenresAPI() {
  return await fetch(`${URL}/genre/movie/list?api_key=${KEY}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      return response.json();
    })
    .then(data => {
      return data.genres;
    })
    .catch(error => {
      console.error(
        'There has been a problem with your fetch operation:',
        error
      );
    });
}
//FUNCTION CALL
//fetchGenresAPI();

// FETCH FOR MOVIE INFO
async function fetchMovieInfoAPI(movie_id) {
  return await fetch(`${URL}/movie/${movie_id}?api_key=${KEY}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error(
        'There has been a problem with your fetch operation:',
        error
      );
    });
}
//FUNCTION CALL
//fetchMovieInfoAPI(8);
// ============= FETCH FOR SEARCH FILMS =================

async function fetchFilmsSearch(searchQuery, page) {
  return await fetch(
    `${URL}/search/movie?api_key=${KEY}&language=en-US&query=${searchQuery}&page=${page}&include_adult=folse`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      return response.json();
    })
    .then(data => {
      return data.results;
    })
    .catch(error => {
      console.error('error:', error);
    });
}
