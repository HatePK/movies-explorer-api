require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const { userRoute, movieRoute, authRoute } = require('./routes');
const authMiddleware = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { NotFound } = require('./errors');
const errorHandler = require('./middlewares/errorHandler');

const { NODE_ENV, DB_HOST } = process.env;
mongoose.connect(NODE_ENV === 'production' ? DB_HOST : 'mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const options = {
  origin: [
    'http://localhost:8080',
    'http://padchin.ru',
    'https://padchin.ru',
  ],
  methods: ['GET', 'HEAD', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};
app.use('*', cors(options));
app.use(bodyParser.json());
app.use(requestLogger);

app.use('/', authRoute);

app.use(authMiddleware);

app.use('/users', userRoute);
app.use('/movies', movieRoute);

app.use('*', () => {
  throw new NotFound('Ресурс не найден');
});

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT);
