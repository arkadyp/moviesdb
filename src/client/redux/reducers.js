import { combineReducers } from 'redux';
import { ACTIONS } from './actions';

const moviesInitialState = {
  popular: [],
  details: {},
  search: [],
};

const apiInitialState = {
  searchMovies: {
    isLoading: false,
    hasLoading: false,
  },
};

const convertListToMovieMap = movieList => movieList.reduce((acc, movie) => {
  acc[movie.id] = movie;
  return acc;
}, {});

function movies(state = moviesInitialState, { type, payload }) {
  switch (type) {
    case ACTIONS.FETCH_POPULAR_SUCCESS:
      return {
        ...state,
        popular: payload.map(movie => movie.id),
        details: {
          ...state.details,
          ...convertListToMovieMap(payload),
        }
      };

    case ACTIONS.SEARCH_MOVIES_SUCCESS:
      return {
        ...state,
        search: payload.map(movie => movie.id),
        details: {
          ...state.details,
          ...convertListToMovieMap(payload),
        }
      };

    case ACTIONS.FETCH_MOVIE_DETAILS_SUCCESS:
      const { details, similarMovies } = payload;
      const { id } = details;
      return {
        ...state,
        details: {
          ...state.details,

          // Updated movie details
          [id]: {
            ...(state.details[id] ? state.details[id] : {}),
            ...details,
            hasDetails: true,
            similarMovieIds: similarMovies.results.map(movie => movie.id),
          },

          // Similar movie data
          ...convertListToMovieMap(similarMovies.results),
        }
      };

    case ACTIONS.RESET_SEARCH_RESULTS:
      return {
        ...state,
        search: [],
      };

    default:
      return state;
  }
}

function api(state = apiInitialState, { type }) {
  switch (type) {
    case ACTIONS.SEARCH_MOVIES_START:
      return {
        ...state,
        searchMovies: {
          isLoading: true,
          hasLoaded: false,
        }
      };
    case ACTIONS.SEARCH_MOVIES_SUCCESS:
    case ACTIONS.SEARCH_MOVIES_FAILURE:
      return {
        ...state,
        searchMovies: {
          isLoading: false,
          hasLoaded: true,
        }
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  api,
  movies,
});

export default rootReducer;
