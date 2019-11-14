import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { withRouter, Link } from 'react-router-dom';


import Loader from './loader';
import MovieCard from './movie-card';
import * as selectors from '../redux/selectors';
import {
  fetchMovieDetailsAction,
} from '../redux/actions';

export class App extends Component {
  componentDidMount() {
    this.fetchDetails();
  }

  componentDidUpdate(prevProps) {
    const {
      match: { params: { movieId } },
    } = this.props;
    if (movieId !== prevProps.match.params.movieId) {
      this.fetchDetails();
    }
  }

  fetchDetails = () => {
    const {
      fetchMovieDetails,
      match: { params: { movieId } },
    } = this.props;
    fetchMovieDetails(movieId);
  }

  render() {
    const { movie, similarMovies } = this.props;
    if (!movie || !movie.hasDetails) {
      return (
        <div className="details-container">
          <Loader />
        </div>
      );
    }

    return (
      <div className="details-container">
        <div className="backsplash" />
        <div className="details-container_header">
          <h1>{movie.title}</h1>
          <Link to="/dashboard">◀ Search For Movies</Link>
        </div>
        {movie.tagline && <h3>{movie.tagline}</h3>}
        <p>{movie.overview}</p>
        <div
          className="details-container__backdrop"
          style={{
            backgroundImage: `url("http://image.tmdb.org/t/p/w780//${movie.backdrop_path}")`
          }}
        />

        <h2>Cast</h2>
        <div className="details_actors-container">
          {(movie.actors || []).map(actor => (
            <div className="actors-card" key={actor.id}>
              <img src={`http://image.tmdb.org/t/p/w92//${actor.profile_path}`} alt="" />
              <div>
                <h2>{actor.name}</h2>
                <h4>{actor.character}</h4>
              </div>
            </div>
          ))}
        </div>

        <h2>Similar Movies</h2>
        <div className="details_similar-movies-container">
          {(similarMovies || []).map(m => <MovieCard key={m.id} {...m} />)}
        </div>
      </div>
    );
  }
}

/*
movie sizes
"w92", "w154", "w185", "w342", "w500", "w780",
 */

const mapStateToProps = (state, props) => {
  const { match: { params: { movieId } } } = props;
  const movies = selectors.getMovieDetails(state);
  const movie = movies[movieId];
  return {
    movie,
    similarMovies: (movie && movie.similarMovieIds)
      ? movie.similarMovieIds.map(id => movies[id])
      : [],
  };
};

const mapDispatchToProps = {
  fetchMovieDetails: fetchMovieDetailsAction,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(App);
