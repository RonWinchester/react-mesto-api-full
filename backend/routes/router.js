const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

router.get('*', (req, res, next) => {
  const error = new NotFoundError('Запрашиваемый ресурс не найден');
  next(error);
});

module.exports = router;
