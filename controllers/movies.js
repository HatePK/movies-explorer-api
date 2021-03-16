const Movie = require('../models/movie');
const { NotFound, Forbidden } = require('../errors');

const getMovies = (req, res, next) => {
  const { _id } = req.user;
  Movie.find({ owner: _id })
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => {
      next(err);
    });
};

const createMovie = (req, res, next) => {
  const { _id } = req.user;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: _id,
  })
    .then((movie) => res.send(movie))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { _id } = req.user;
  const { movieId } = req.params;
  Movie.findOne({ _id: movieId })
    .then((movie) => {
      if (!movie) {
        throw new NotFound('Нет фильма с таким id');
      } else if (movie.owner.toString() === _id) {
        Movie.deleteOne({ _id: movieId })
          .then((deletedMovie) => res.status(200).send(deletedMovie));
      } else throw new Forbidden('Нет прав для удаления фильма');
    })
    .catch(next);
};

module.exports = { getMovies, createMovie, deleteMovie };
