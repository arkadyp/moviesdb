import React from 'react';
import { Link } from 'react-router-dom';

const getCardImageStyle = (posterPath) => {
  if (posterPath) {
    return {
      backgroundImage: `url(http://image.tmdb.org/t/p/w185//${posterPath})`
    };
  }
  return {
    background: '#e4cccc',
  };
};

export default function MovieCard({
  id,
  genres,
  overview,
  poster_path: posterPath,
  title,
  vote_average: voteAverage,
}) {
  return (
    <Link className="movie-card__link-container" to={`/details/${id}`}>
      <div className="movie-card">
        <div
          className="movie-card__image"
          style={getCardImageStyle(posterPath)}
        />
        <div className="movie-card__content">
          <h3>{title}</h3>
          {genres && <h5>{genres.join(' / ')}</h5>}
          <p className="movie-card__overview">{overview}</p>
          <div className="movie-card__rating-container">
            <h2>{voteAverage ? voteAverage.toFixed(1) : ''}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
}
