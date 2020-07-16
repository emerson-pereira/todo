const bcrypt = require('bcrypt');
const User = require('../models/User');

const loginController = {
  async login(req, res) {
    const user = await User.findOne({ email: req.body.email }).select(
      '+password'
    );

    try {
      const isMatch = await bcrypt.compare(req.body.password, user.password);

      if (!isMatch) {
        res.send('Invalid credentials');
      }

      const token = user.generateAuthToken();

      res.header('x-auth-token', token).send({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } catch (err) {
      res.status(500).send();
    }
  },
};

module.exports = loginController;
