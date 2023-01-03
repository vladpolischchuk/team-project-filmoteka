import { fetchFilmsAPI, fetchGenresAPI } from './film-api';

const refs = {
    movieList: document.querySelector('.home'),
}

const basicImgURL = 'https://image.tmdb.org/t/p/w500';
const page = 1;

fetchGenresAPI().then(genres => {
    fetchFilmsAPI(page).then(data => {
        let markup = createCardMarkup(data, genres);
        refs.movieList.insertAdjacentHTML('beforeend', markup);
    });
});


function createCardMarkup(data, genres_names) {
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
        for (let genre_id of genre_ids) {
            let genre = genres_names.find(({id}) => id === genre_id);
            genres.push(genre.name);
        }
        if (genres.length >= 3) {
            genres = [genres[0], genres[1], 'Other'];
        }
        let genres_str = genres.join(', ');
        return `<li class="card">
  <a href="" class="card-link link">
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
