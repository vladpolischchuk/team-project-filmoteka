import { createCardMarkup } from './trending-films-render';
import { fetchGenresAPI } from './film-api';
import { preloader } from './preloader';
import Notiflix from 'notiflix';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

// ============ SET NOTIFY ===========================

Notiflix.Notify.init({
  width: '320px',
  position: 'center-top',
  distance: '5px',
  opacity: '1',
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '14px',
  timeout: 300,
  cssAnimationStyle: 'from-top',
  useIcon: false,
  cssAnimationDuration: 4000,

  failure: {
    background: '#000',
    textColor: '#FF001B',
    childClassName: 'notiflix-notify-failure',
    fontAwesomeClassName: 'fas fa-times-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'none',
    // ...
  },
});
// ========================================================

const refs = {
  form: document.querySelector('.input'),
  searchQuery: document.querySelector('.input-position'),
  movieList: document.querySelector('.home'),
  pagination: document.querySelector('.tui-pagination'),
  filmModalList: document.querySelector('.backdrop'),
};

refs.form.addEventListener('submit', onInput);

// ============= FETCH FOR SEARCH FILMS =================

const URL = 'https://api.themoviedb.org/3';

const KEY = 'cf961b1b89f4c4a28558be2b04fdd59a';
let inputOn = '';

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

async function fetchFilmsSearch(page) {
  try {
    const response = await fetch(
      `${URL}/search/movie?api_key=${KEY}&language=en-US&query=${inputOn}&page=${page}&include_adult=folse`
    );
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    const data = await response.json();

    pagination.reset(data.total_results);
    refs.pagination.classList.remove('pagination-is-hidden');

    return data.results;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

// ================= MORE SEARCH =================

async function fetchMoreFilmsSearch(page) {
  try {
    const response = await fetch(
      `${URL}/search/movie?api_key=${KEY}&language=en-US&query=${inputOn}&page=${page}&include_adult=folse`
    );
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    const data = await response.json();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    return data.results;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

pagination.on('afterMove', fetchMoreGenresSearchAPI);

async function fetchMoreGenresSearchAPI(event) {
  const currentPage = event.page;

  fetchGenresAPI().then(genres => {
    fetchMoreFilmsSearch(currentPage).then(data => {
      let markup = createCardMarkup(data, genres);

      clearInput();
      refs.movieList.innerHTML = '';
      refs.movieList.insertAdjacentHTML('beforeend', markup);
    });
  });
}

// =====================================================
function onInput(e) {
  e.preventDefault();

  inputOn = inputOn = e.target.elements.searchQuery.value.trim();

  fetchGenresAPI().then(genres => {
    fetchFilmsSearch().then(data => {
      if (data.length === 0 ) {
        return Notiflix.Notify.failure(
          'Search result not successful. Enter the correct movie name and'
        );
      }
      let markup = createCardMarkup(data, genres);
      refs.movieList.insertAdjacentHTML('beforeend', markup);
    });
  });
  clearInput();
}

function clearInput() {
  refs.movieList.innerHTML = '';
  refs.searchQuery.value = '';
}


