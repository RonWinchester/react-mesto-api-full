const cardsRouter = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { /* cardsCreateValidation, */ paramsValidation } = require('../middlewares/validation');

const method = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('URL validation err');
};

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(method),
  }),
}) /* cardsCreateValidation */, createCard);
cardsRouter.delete('/cards/:cardId', paramsValidation, deleteCard);
cardsRouter.put('/cards/:cardId/likes', paramsValidation, likeCard);
cardsRouter.delete('/cards/:cardId/likes', paramsValidation, dislikeCard);

module.exports = cardsRouter;
