const Project = require('../models/Project');
const Task = require('../models/Task');

const projectController = {
  async createProjectTask(req, res) {
    const task = new Task(req.body);

    const project = await Project.findByIdAndUpdate(req.params.projectId, {
      $push: { tasks: task },
    });

    task.project = project;
    await task.save();

    res.status(201).json(task);
  },

  async getProjectTasks(req, res) {
    const projectTasks = await Project.findById(req.params.projectId).populate(
      'tasks'
    );
    res.status(200).json(projectTasks);
  },

  async updateProjectTask(req, res) {
    const task = await Task.updateOne(
      { _id: req.params.taskId, project: req.params.projectId },
      req.body
    );
    res.status(200).json(task);
  },

  async removeProjectTask(req, res) {
    // req.params.projectId
    const task = await Task.deleteOne({
      _id: req.params.taskId,
      project: req.params.projectId,
    });

    await Project.findByIdAndUpdate(req.params.projectId, {
      $pull: { tasks: req.params.taskId },
    });

    res.status(200).json(task);
  },
};

module.exports = projectController;
