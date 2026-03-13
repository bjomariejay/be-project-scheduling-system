const errorHandler = (err, req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Unexpected server error' });
};

module.exports = { errorHandler };
