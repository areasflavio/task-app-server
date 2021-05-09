const jwt = require('jsonwebtoken');

const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    const [_, token] = authHeader.split(' ');

    const decoded = jwt.verify(token, 'task-manager');

    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) throw new Error();

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Please authenticate.' });
  }
};

module.exports = auth;
