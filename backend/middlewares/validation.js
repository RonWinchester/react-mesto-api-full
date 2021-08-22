const { celebrate, Joi } = require('celebrate');

module.exports.cardsCreateValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
});

module.exports.createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().pattern(/^((http|https):\/\/)(www\.)?([\w+#!:.?+=&%@!\-\/])+\.([\w\.]{2,})([\w+#!:.?+=&%@!\-\/])*\/?$/),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
  }),
});

module.exports.loginUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
  }),
});

module.exports.paramsValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

module.exports.userValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});

module.exports.editProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

module.exports.editAvatarValidation = celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().required().pattern(/^((http|https):\/\/)(www\.)?([\w+#!:.?+=&%@!\-\/])+\.([\w\.]{2,})([\w+#!:.?+=&%@!\-\/])*\/?$/),
  }),
});
