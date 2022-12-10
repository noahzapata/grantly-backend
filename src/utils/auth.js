const jwt = require('jsonwebtoken');
const User = require('../api/user/user.model');

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new Error('The sesion has expired by athorization');
    }
    // eslint-disable-next-line no-unused-vars
    const [_, token] = authorization.split(' ');
    console.log(token);
    if (!token) {
      throw new Error('The sesion has expired by token');
    }
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    req.user = id;
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error('ID does not exist');
    }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid-token', error: err.message });
  }
};

module.exports = { auth };
