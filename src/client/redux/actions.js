import keymirror from 'keymirror';

export const ACTIONS = keymirror({
  FETCH_POPULAR_START: null,
  FETCH_POPULAR_SUCCESS: null,
  FETCH_POPULAR_FAILURE: null,

  SEARCH_MOVIES_START: null,
  SEARCH_MOVIES_SUCCESS: null,
  SEARCH_MOVIES_FAILURE: null,

  FETCH_MOVIE_DETAILS_START: null,
  FETCH_MOVIE_DETAILS_SUCCESS: null,
  FETCH_MOVIE_DETAILS_FAILURE: null,

  RESET_SEARCH_RESULTS: null,
});

export const fetchPopularMoviesAction = () => (dispatch) => {
  dispatch({ type: ACTIONS.FETCH_POPULAR_START });
  fetch('/api/getPopularMovies')
    .then(res => res.json())
    .then(({ data }) => {
      dispatch({
        type: ACTIONS.FETCH_POPULAR_SUCCESS,
        payload: data.results,
      });
    })
    .catch(() => {
      dispatch({ type: ACTIONS.FETCH_POPULAR_FAILURE });
    });
};

export const searchMoviesAction = query => (dispatch) => {
  dispatch({ type: ACTIONS.SEARCH_MOVIES_START });
  fetch(`/api/searchMovies?query=${query}`)
    .then(res => res.json())
    .then(({ data }) => {
      dispatch({
        type: ACTIONS.SEARCH_MOVIES_SUCCESS,
        payload: data.results,
      });
    })
    .catch(() => {
      dispatch({ type: ACTIONS.SEARCH_MOVIES_FAILURE });
    });
};

export const fetchMovieDetailsAction = id => (dispatch) => {
  dispatch({ type: ACTIONS.FETCH_MOVIE_DETAILS_START });
  fetch(`/api/movieDetails?id=${id}`)
    .then(res => res.json())
    .then(({ data }) => {
      dispatch({
        type: ACTIONS.FETCH_MOVIE_DETAILS_SUCCESS,
        payload: data,
      });
    })
    .catch(() => {
      dispatch({ type: ACTIONS.FETCH_MOVIE_DETAILS_FAILURE });
    });
};

export const resetSearchResultAction = () => ({
  type: ACTIONS.RESET_SEARCH_RESULTS
});
