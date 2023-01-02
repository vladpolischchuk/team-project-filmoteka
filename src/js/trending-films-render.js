import {fetchFilmsAPI, fetchGenresAPI} from './film-api';

const refs = {
    movieList: document.querySelector('.card-list'),
}

const basicImgURL = 'https://image.tmdb.org/t/p/w500';

fetchFilmsAPI(page = 1)
    .then(data => {
        refs.movieList.insertAdjacentHTML('beforeend', createCardMarkup(data));
    });


function createCardMarkup(data) {
    if (data.length === 0) {
        return;
    }
    return data.map((
        {
            title,
            poster_path,
            release_date,
            genre_ids,
        }
    ) => {
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
    }).join('');
}