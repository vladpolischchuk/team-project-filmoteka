import { createCardMarkup } from "./trending-films-render";
import { fetchGenresAPI} from "./film-api";
import { preloader } from './preloader';
import Notiflix from 'notiflix';



// ============ SET NOTIFY ===========================

Notiflix.Notify.init({
  width: '320px',
  position: 'center-top',
  distance: '150px',
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
    background: 'transparent',
    textColor: '#FF001B',
    childClassName: 'notiflix-notify-failure',
    fontAwesomeClassName: 'fas fa-times-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'none',
  // ...
}})
// ========================================================


const refs = {
  form: document.querySelector('.input'),
  searchQuery: document.querySelector('.input-position'),
  movieList: document.querySelector('.home'),
  pagination: document.querySelector('.tui-pagination'),
  filmModalList: document.querySelector('.backdrop')
};
  
  refs.form.addEventListener('submit', onInput);

// ============= FETCH FOR SEARCH FILMS =================

const URL = 'https://api.themoviedb.org/3';

const KEY = 'cf961b1b89f4c4a28558be2b04fdd59a';
let inputOn = '';

async function fetchFilmsSearch(page) {
  try {
        const response = await fetch(`${URL}/search/movie?api_key=${KEY}&language=en-US&query=${inputOn}&page=${page}&include_adult=folse`)
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        const data = await response.json();

        onList(data);


        return data.results;
       
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

// ================= MORE SEARCH =================


async function fetchMoreSearch(e) {
  const currentPage = e.page;

  fetchGenresAPI().then(genres => {
    fetchFilmsSearch(currentPage).then(data => {
      let markup = createCardMarkup(data, genres);

      clearInput();
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
        let markup = createCardMarkup(data, genres);
        refs.movieList.insertAdjacentHTML('beforeend', markup);
      
    });
});
clearInput();
}
 
function clearInput() {
    refs.movieList.innerHTML = "";
    refs.searchQuery.value = "";
   };

function onList(data) {
  if ( data.results.length === 0 || data.results === []) {
      return Notiflix.Notify.failure(
              'Search result not successful. Enter the correct movie name and'
            );
    } 

  }
  