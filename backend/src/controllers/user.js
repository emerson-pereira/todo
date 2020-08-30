const bcrypt = require('bcrypt');
const userSchema = require('./schemas/userSchema');
const updateUserSchema = require('./schemas/updateUserSchema');
const User = require('../models/User');
const Project = require('../models/Project');
const Task = require('../models/Task');
const { success, fail } = require('../utils/responder');
const { getErrorMessage } = require('../utils/joi');

const userController = {
  async getCurrentUser(req, res) {
    try {
      const user = await User.findById(req.user.id).select('-projects -__v');

      if (!user) {
        return fail(res, {
          status: 404,
          message: 'User not identified',
        });
      }

      success(res, {
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (err) {
      fail(res);
    }
  },

  async createUser(req, res) {
    const { value, error } = userSchema.validate(req.body);

    if (error) {
      return fail(res, {
        status: 400,
        message: getErrorMessage(error),
      });
    }

    try {
      const user = new User(value);
      user.password = await bcrypt.hash(user.password, 10);
      const newUser = await user.save();

      const token = user.generateAuthToken();

      success(res, {
        status: 201,
        data: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          // igonored fields
          // newUser.projects
          // newUser.__v
        },
        headers: {
          'x-auth-token': token,
        },
      });
    } catch (error) {
      fail(res);
    }
  },

  async updateCurrentUser(req, res) {
    const { value, error } = updateUserSchema.validate(req.body);

    if (error) {
      return fail(res, {
        status: 400,
        message: getErrorMessage(error),
      });
    }

    try {
      const data = value;
      const options = { new: true };

      const user = await User.findByIdAndUpdate(
        req.user.id,
        data,
        options
      ).select('-projects -__v');

      if (!user) {
        return fail(res, {
          status: 404,
          message: 'User not identified',
        });
      }

      success(res, {
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (err) {
      fail(res);
    }
  },

  async removeCurrentUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.user.id).select(
        '-projects -__v'
      );

      if (!user) {
        return fail(res, {
          status: 404,
          message: 'User not identified',
        });
      }

      await Project.deleteMany({ owner: req.user.id });

      await Task.deleteMany({
        project: {
          $in: user.projects,
        },
      });

      success(res, {
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (err) {
      fail(res);
    }
  },
};

module.exports = userController;
