const bcrypt = require('bcrypt');
const User = require('../models/User');
const Project = require('../models/Project');
const Task = require('../models/Task');

const userController = {
  async createUser(req, res) {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    user.password = await bcrypt.hash(user.password, 10);

    await user.save();

    const token = user.generateAuthToken();

    res.header('x-auth-token', token).send({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  },

  async getCurrentUser(req, res) {
    const user = await User.findById(req.user._id);
    res.status(200).json(user);
  },

  async updateCurrentUser(req, res) {
    const user = await User.findByIdAndUpdate(req.user._id, req.body);
    res.status(200).json(user);
  },

  async removeCurrentUser(req, res) {
    const user = await User.findByIdAndDelete(req.user._id);

    await Project.deleteMany({ owner: req.user._id });

    await Task.deleteMany({
      project: {
        $in: user.projects,
      },
    });

    res.status(200).json(user);
  },
};

module.exports = userController;
