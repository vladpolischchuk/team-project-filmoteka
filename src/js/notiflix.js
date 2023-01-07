import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.input'),
  input: document.querySelector('.input-position'),
  filmModalList: document.querySelector('.backdrop'),
};

Notiflix.Notify.init({
  width: '320px',
  position: 'center-top',
  distance: '5px',
  opacity: '1',
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '14px',
  timeout: 4000,
  cssAnimationStyle: 'from-top',
  useIcon: false,
  cssAnimationDuration: 1000,

failure: {
    background: '#000',
    textColor: '#FF001B',
    childClassName: 'notiflix-notify-failure',
    fontAwesomeClassName: 'fas fa-times-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'none',
  // ...
}});

const URL = 'https://api.themoviedb.org/3';
const KEY = 'cf961b1b89f4c4a28558be2b04fdd59a';
let inputOn = '';
refs.form.addEventListener('submit', onInput);

function fetchFilmsAPI() {
  return fetch(`${URL}/search/keyword?api_key=${KEY}&query=${inputOn}`)
      .then((response) => {
          if (!response.ok) {
              throw new Error('Network response was not OK');
          }
          return response.json();
      })
      .then((data) => {
        console.log(data.results)
        onList(data);
          return data.results;
      })
      .catch((error) => {
          console.error('There has been a problem with your fetch operation:', error);
      });
}

function onInput(e) {
  e.preventDefault();
  console.log(e.target.elements.searchQuery.value)
  inputOn = e.target.elements.searchQuery.value.trim();
  // newsApiServer.resetPage();
  fetchFilmsAPI()
}
  

function onList(data) {
console.log(data);
  if ( data.results.length === 0) {
      return Notiflix.Notify.failure(
              'Search result not successful. Enter the correct movie name and'
            );
    }
  }