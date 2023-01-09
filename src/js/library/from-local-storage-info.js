const isMovieInWatched = () => {
    let watchedMovies = null;
    try {
        watchedMovies = JSON.parse(localStorage.getItem('Watched movies'));
    } catch {
        return;
    }
    return watchedMovies;
}

const isMovieInQueue = () => {
    let queueMovies = null;
    try {
        queueMovies = JSON.parse(localStorage.getItem('Queue movies'));
    } catch {
        return;
    }
    return queueMovies;
}

export { isMovieInWatched, isMovieInQueue };