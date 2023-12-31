const errorHandler = (err, _req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'Произошла ошибка'
      : message,
  });

  next();
};

module.exports = errorHandler;
