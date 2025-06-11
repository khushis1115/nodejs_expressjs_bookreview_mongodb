function authMiddleware(req, res, next) {
  if (!req.session.username) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
}

module.exports = authMiddleware;
