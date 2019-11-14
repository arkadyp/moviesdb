import { createSelector } from 'reselect';

const GENRES = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

export const getMovieDetails = state => state.movies.details;

export const getPopularMovieIds = state => state.movies.popular;

export const getSearchResultIds = state => state.movies.search;

export const addGenresToMovie = movie => ({
  ...movie,
  genres: (movie.genre_ids || []).map(id => GENRES[id]),
});

export const getPopularMovies = createSelector(
  getMovieDetails,
  getPopularMovieIds,
  (details, popularIds) => {
    if (!details || !popularIds) {
      return [];
    }
    return popularIds.map(id => addGenresToMovie(details[id]));
  }
);

export const getSearchResults = createSelector(
  getMovieDetails,
  getSearchResultIds,
  (details, searchIds) => {
    if (!details || !searchIds) {
      return [];
    }
    return searchIds.map(id => addGenresToMovie(details[id]));
  }
);

export const getSearchMoviesStatus = state => state.api.searchMovies;
