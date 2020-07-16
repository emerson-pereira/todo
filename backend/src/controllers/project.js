const Project = require('../models/Project');
const User = require('../models/User');
const Task = require('../models/Task');

const projectController = {
  async createUserProject(req, res) {
    const project = new Project(req.body);

    const user = await User.findByIdAndUpdate(req.user._id, {
      $push: { projects: project },
    });

    project.owner = user;
    await project.save();

    res.status(201).json(project);
  },

  async getUserProjects(req, res) {
    const userProjects = await User.findById(req.user._id).populate({
      path: 'projects',
      populate: { path: 'tasks', model: 'Task' },
    });
    res.status(200).json(userProjects);
  },

  async updateUserProject(req, res) {
    const project = await Project.findByIdAndUpdate(
      req.params.projectId,
      req.body
    );
    res.status(200).json(project);
  },

  async removeUserProject(req, res) {
    const project = await Project.findByIdAndDelete(req.params.projectId);

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { projects: project._id },
    });

    await Task.deleteMany({ project: project._id });

    res.status(200).json(project);
  },
};

module.exports = projectController;
