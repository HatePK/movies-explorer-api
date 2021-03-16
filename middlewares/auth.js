const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../errors');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Unauthorized('Невалидный токен');
  }

  const token = authorization.replace(/^Bearer /, '');

  try {
    const payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'secret',
    );
    req.user = payload;
  } catch {
    throw new Unauthorized('Невалидный токен');
  }

  next();
};

module.exports = auth;
