const bcrypt = require('bcrypt');
const User = require('../models/User');

const loginController = {
  async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(401).json({
        error: {
          message: 'No email or password provided.',
        },
      });
    }

    const user = await User.findOne({ email: req.body.email }).select(
      '+password'
    );

    if (!user) {
      return res.status(404).json({
        error: {
          message: 'User does not exist.',
        },
      });
    }

    try {
      const isMatch = await bcrypt.compare(req.body.password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          error: {
            message: 'Invalid credentials.',
          },
        });
      }

      const token = user.generateAuthToken();

      res.header('x-auth-token', token).status(200).json({
        name: user.name,
        email: user.email,
      });
    } catch (err) {
      res.status(500).json({
        error: {
          message: 'Unexpected error. Try again later.',
        },
      });
    }
  },
};

module.exports = loginController;
