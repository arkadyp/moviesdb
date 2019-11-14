const express = require('express');
const os = require('os');
const request = require('request-promise-native');
const path = require('path');

const app = express();

// Note: It's very bad practice to commit API keys directly to a codebase but I thought it
// was fine in the context of this exercise
const API_KEY = '97722208a74a0e2781c4b2be7ee1aaab';

app.use(express.static('dist'));
app.get(
  '/api/getUsername',
  (req, res) => {
    res.send({ username: os.userInfo().username });
  }
);

app.get(
  '/api/getPopularMovies',
  (req, res) => {
    request({
      uri: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
      json: true,
    })
      .then((data) => {
        res.send({ data });
      })
      .catch((e) => {
        res.status(500).send({
          error: 'foobar',
          rawErr: e,
        });
      });
  }
);

app.get(
  '/api/searchMovies',
  (req, res) => {
    request({
      uri: `https://api.themoviedb.org/3/search/movie?query=${req.query.query}&api_key=${API_KEY}&language=en-US&page=1&include_adult=false`,
      json: true,
    })
      .then((data) => {
        res.send({ data });
      })
      .catch((e) => {
        res.status(500).send({
          error: 'foobar',
          rawErr: e,
        });
      });
  }
);

app.get(
  '/api/movieDetails',
  (req, res) => {
    const movieId = req.query.id;
    const detailsPromise = request({
      uri: `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
      json: true,
    });
    const castPromise = request({
      uri: `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`,
      json: true,
    });
    const similarMoviesPromise = request({
      uri: `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`,
      json: true,
    });

    Promise.all([detailsPromise, castPromise, similarMoviesPromise])
      .then((data) => {
        const details = data[0];
        const castData = data[1];
        details.actors = castData.cast.filter(d => d.order < 10);
        res.send({ data: { details, similarMovies: data[2] } });
      })
      .catch((e) => {
        res.status(500).send({
          error: 'foobar',
          rawErr: e,
        });
      });
  }
);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
