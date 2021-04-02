const movieRoute = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const createMovieValidator = require('../middlewares/validators/createMovie');
const deleteMovieValidator = require('../middlewares/validators/deleteMovie');

movieRoute.get('/', getMovies);
movieRoute.post('/', createMovieValidator, createMovie);
movieRoute.delete('/:movieId', deleteMovieValidator, deleteMovie);

module.exports = movieRoute;
