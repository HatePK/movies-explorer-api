const { celebrate, Joi } = require('celebrate');

const deleteMovie = celebrate({
  params: {
    movieId: Joi.string().length(24).hex(),
  },
});

module.exports = deleteMovie;
