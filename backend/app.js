require('dotenv').config();

const express = require('express');

const helmet = require('helmet');
const cors = require('cors');

// const { PORT = 4000 } = process.env;
const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const cookieParser = require('cookie-parser');

const { auth } = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { login, createUser } = require('./controllers/users');
const { regexpEmail } = require('./utils/constants');
const NotFoundError = require('./errors/notFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const notFoundError = new NotFoundError('Такой страницы не существует');

const app = express();

app.use(helmet());
app.use(cors({ origin: ['https://haze.nomoreparties.co'], credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regexpEmail),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
}), createUser);

app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.use('*', (_req, _res, next) => next(notFoundError));

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  autoIndex: true,
});

app.listen(PORT, () => {
  console.log(`Приложение работает на ${PORT} порте`);
});
