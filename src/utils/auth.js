const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Access-denied' });
  }
  const [_, token] = authorization.split(' ');

  if (!token) {
    return res.status(401).json({ error: 'Session expired' });
  }
  try {
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    req.user = id;
    next();
  } catch (e) {
    res.status(401).json({ error: 'Invalid-token' });
  }
};
