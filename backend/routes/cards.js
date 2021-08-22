const cardsRouter = require('express').Router();
const { cardsCreateValidation, paramsValidation } = require('../middlewares/validation');

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', cardsCreateValidation, createCard);
cardsRouter.delete('/cards/:cardId', paramsValidation, deleteCard);
cardsRouter.put('/cards/:cardId/likes', paramsValidation, likeCard);
cardsRouter.delete('/cards/:cardId/likes', paramsValidation, dislikeCard);

module.exports = cardsRouter;
