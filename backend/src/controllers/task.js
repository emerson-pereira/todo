const taskSchema = require('./schemas/taskSchema');
const Project = require('../models/Project');
const Task = require('../models/Task');
const { success, fail } = require('../utils/responder');
const { getErrorMessage } = require('../utils/joi');

const projectController = {
  async getProjectTasks(req, res) {
    try {
      const query = {
        project: {
          _id: req.params.projectId,
          owner: req.user.id,
        },
      };

      const tasks = await Task.find(query).select('-project -__v');

      const data = tasks.map((task) => ({
        id: task._id,
        name: task.name,
        isDone: task.isDone,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      }));

      success(res, { data });
    } catch (err) {
      fail(res);
    }
  },

  async getProjectTaskById(req, res) {
    try {
      const query = {
        _id: req.params.taskId,
        project: {
          _id: req.params.projectId,
          owner: req.user.id,
        },
      };

      const task = await Task.findOne(query).select('-project -__v');

      if (!task) {
        return fail(res, {
          status: 404,
          message: 'Task not found',
        });
      }

      success(res, {
        data: {
          id: task._id,
          name: task.name,
          isDone: task.isDone,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
        },
      });
    } catch (err) {
      fail(res);
    }
  },

  async createProjectTask(req, res) {
    const { value, error } = taskSchema.validate(req.body);

    if (error) {
      return fail(res, {
        status: 400,
        message: getErrorMessage(error),
      });
    }

    try {
      const task = new Task(value);
      const project = await Project.findOneAndUpdate(
        {
          _id: req.params.projectId,
          owner: req.user.id,
        },
        {
          $push: { tasks: task },
        }
      );
      task.project = project;
      const newTask = await task.save();

      success(res, {
        status: 201,
        data: {
          id: newTask._id,
          name: newTask.name,
          isDone: newTask.isDone,
          createdAt: newTask.createdAt,
          updatedAt: newTask.updatedAt,
          // ignored fields:
          // newTask.project
          // newTask.__v
        },
      });
    } catch (err) {
      fail(res);
    }
  },

  async updateProjectTask(req, res) {
    const { value, error } = taskSchema.validate(req.body);

    if (error) {
      return fail(res, {
        status: 400,
        message: getErrorMessage(error),
      });
    }

    try {
      const query = {
        _id: req.params.taskId,
        project: {
          _id: req.params.projectId,
          owner: req.user.id,
        },
      };
      const data = value;
      const options = { new: true };

      const task = await Task.findOneAndUpdate(query, data, options).select(
        '-project -__v'
      );

      if (!task) {
        return fail(res, {
          status: 404,
          message: 'Task not found',
        });
      }

      success(res, {
        data: {
          id: task._id,
          name: task.name,
          isDone: task.isDone,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
        },
      });
    } catch (err) {
      fail(res);
    }
  },

  async removeProjectTask(req, res) {
    try {
      const query = {
        _id: req.params.taskId,
        project: {
          _id: req.params.projectId,
          owner: req.user.id,
        },
      };

      const task = await Task.findOneAndDelete(query).select('-project -__v');

      if (!task) {
        return fail(res, {
          status: 404,
          message: 'Task not found',
        });
      }

      await Project.findByIdAndUpdate(req.params.projectId, {
        $pull: { tasks: req.params.taskId },
      });

      success(res, {
        data: {
          id: task._id,
          name: task.name,
          isDone: task.isDone,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
        },
      });
    } catch (err) {
      fail(res);
    }
  },
};

module.exports = projectController;
