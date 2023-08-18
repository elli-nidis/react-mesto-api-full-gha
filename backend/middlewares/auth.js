const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');

const unauthorizedError = new UnauthorizedError('Необходима авторизация');

// eslint-disable-next-line consistent-return
function auth(req, _res, next) {
  const token = req.cookies.jwt;

  if (!token) {
    return next(unauthorizedError);
  }

  let payload;

  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'secret-word-mutabor'}`);
  } catch (err) {
    return next(unauthorizedError);
  }

  req.user = payload;

  next();
}

module.exports = { auth };
