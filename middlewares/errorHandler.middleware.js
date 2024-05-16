function handleError(err, req, res, next) {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    error: {
      message: message,
      status: status
    }
  });
}

module.exports = handleError;