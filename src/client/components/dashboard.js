import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import debounce from 'just-debounce-it';

import * as selectors from '../redux/selectors';
import MovieCard from './movie-card';
import Loader from './loader';
import {
  fetchPopularMoviesAction,
  resetSearchResultAction,
  searchMoviesAction,
} from '../redux/actions';

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this._debouncedFetchMovies = debounce(this._fetchMovies, 400);
  }

  state = {
    search: '',
    isLoadingSearchResults: false
  };

  componentDidMount() {
    this.props.fetchPopularMovies();
  }

  componentDidUpdate(prevProps) {
    const { searchResults } = this.props;
    if (searchResults !== prevProps.searchResults) {
      this.setState({ isLoadingSearchResults: false });
    }
  }

  _renderMovies = movies => (
    <div className="movies-container">
      {movies.map(movie => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </div>
  )

  _fetchMovies = (query) => {
    const { resetSearchResult, searchMovies } = this.props;
    if (!query) {
      resetSearchResult();
      return;
    }
    searchMovies(query);
  }

  _onSearch = (e) => {
    const query = e.target.value;
    this.setState({ search: query, isLoadingSearchResults: Boolean(query) });
    this._debouncedFetchMovies(query);
  };

  _renderSearchResults = () => {
    const { isLoadingSearchResults, search } = this.state;
    const { searchResults } = this.props;
    return isLoadingSearchResults
      ? <Loader />
      : !search
        ? null
        : !searchResults.length
          ? (
            <h2 className="dashboard-subtitle">
         No movies match your current search term
            </h2>
          )
          : (
            <div className="search-results-container">
              {this._renderMovies(searchResults)}
            </div>
          );
  };

  _renderPopularFilms = () => {
    const { popularMovies } = this.props;
    return !popularMovies.length
      ? <Loader />
      : (
        <React.Fragment>
          <h2 className="dashboard-subtitle">Popular Films</h2>
          {this._renderMovies(popularMovies)}
        </React.Fragment>
      );
  };

  render() {
    const { search } = this.state;
    return (
      <div className="dashboard-container">
        <input
          type="text"
          value={search}
          placeholder="Search for your favorite movies"
          onChange={this._onSearch}
          className="search-bar"
        />
        {this._renderSearchResults()}
        {this._renderPopularFilms()}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  popularMovies: selectors.getPopularMovies,
  searchResults: selectors.getSearchResults,
});

const mapDispatchToProps = {
  fetchPopularMovies: fetchPopularMoviesAction,
  resetSearchResult: resetSearchResultAction,
  searchMovies: searchMoviesAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
