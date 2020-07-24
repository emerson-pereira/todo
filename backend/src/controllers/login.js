const bcrypt = require('bcrypt');
const loginSchema = require('./schemas/loginSchema');
const User = require('../models/User');
const { success, fail } = require('../utils/responder');

const loginController = {
  async login(req, res) {
    const { value, error } = loginSchema.validate(req.body);

    if (error) {
      return fail(res, {
        status: 400,
        message: error.details[0].message,
      });
    }

    try {
      const query = { email: value.email };
      const user = await User.findOne(query).select('+password');

      if (!user) {
        return fail(res, {
          status: 404,
          message: 'User not found',
        });
      }

      const isMatch = await bcrypt.compare(value.password, user.password);

      if (!isMatch) {
        return fail(res, {
          status: 401,
          message: 'Invalid credentials',
        });
      }

      const token = user.generateAuthToken();

      success(res, {
        data: {
          name: user.name,
          email: user.email,
        },
        headers: {
          'x-auth-token': token,
        },
      });
    } catch (err) {
      fail(res);
    }
  },
};

module.exports = loginController;
