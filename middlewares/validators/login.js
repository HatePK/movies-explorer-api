const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const login = celebrate({
  body: {
    password: Joi.string().required().messages({
      'any.required': 'Обязательное поле',
    }),
    email: Joi.string().required().custom((value, helper) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helper.message('Введите Email');
    })
      .messages({
        'any.required': 'Обязательное поле',
      }),
  },
});

module.exports = login;
