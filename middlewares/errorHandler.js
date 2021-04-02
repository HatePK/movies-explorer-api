const { CelebrateError } = require('celebrate');

const errorHandler = (err, req, res, next) => {
  if (err instanceof CelebrateError && err.details.get('body')) {
    return res.status(400).send(err.details.get('body'));
  }

  if (err instanceof CelebrateError && err.details.get('params')) {
    return res.status(400).send(err.details.get('params'));
  }

  if (err.status) {
    return res.status(err.status).send({ message: err.message });
  }

  res.status(500).send({ message: err.message });

  return next();
};

module.exports = errorHandler;
