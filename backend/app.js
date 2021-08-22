const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const dotenv = require('dotenv');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const router = require('./routes/router');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/errorHandler');
const { createUserValidation, loginUserValidation } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

dotenv.config();

const { PORT = 3000 } = process.env;
const app = express();
app.use(cookieParser());
app.use(helmet());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger);

// роуты, не требующие авторизации
app.post('/signup', createUserValidation, createUser);
app.post('/signin', loginUserValidation, login);

// авторизация
app.use(auth);

app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
