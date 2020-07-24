const jwt = require('jsonwebtoken');
const { fail } = require('../utils/responder');

const auth = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return fail(res, {
      status: 401,
      message: 'No token provided',
    });
  }

  try {
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded;
    next();
  } catch (err) {
    return fail(res, {
      status: 400,
      message: 'Invalid token',
    });
  }
};

module.exports = auth;
