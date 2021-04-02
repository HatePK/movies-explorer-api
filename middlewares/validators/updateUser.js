const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const updateUser = celebrate({
  body: {
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Минимум 2 символа',
      'string.max': 'Максимум 30 символов',
    }),
    email: Joi.string().custom((value, helper) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helper.message('Введите Email');
    }),
  },
});

module.exports = updateUser;
