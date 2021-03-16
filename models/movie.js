const mongoose = require('mongoose');
const User = require('./user');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(http|https):\/\/[^ "]+$/.test(v);
      },
      message: 'Некорректный URL',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(http|https):\/\/[^ "]+$/.test(v);
      },
      message: 'Некорректный URL',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(http|https):\/\/[^ "]+$/.test(v);
      },
      message: 'Некорректный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
