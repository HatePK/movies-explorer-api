const userRoute = require('express').Router();
const { updateUser, getCurrentUser } = require('../controllers/users');
const updateUserValidator = require('../middlewares/validators/updateUser');

userRoute.get('/me', getCurrentUser);
userRoute.patch('/me', updateUserValidator, updateUser);

module.exports = userRoute;
