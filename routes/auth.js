const authRoute = require('express').Router();
const { register, login } = require('../controllers/users');
const loginValidator = require('../middlewares/validators/login');
const registerValidator = require('../middlewares/validators/register');

authRoute.post('/signup', registerValidator, register);
authRoute.post('/signin', loginValidator, login);

module.exports = authRoute;
