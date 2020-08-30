const projectSchema = require('./schemas/projectSchema');
const Project = require('../models/Project');
const User = require('../models/User');
const Task = require('../models/Task');
const { success, fail } = require('../utils/responder');
const { getErrorMessage } = require('../utils/joi');

const projectController = {
  async getUserProjects(req, res) {
    try {
      const query = { owner: req.user.id };

      const projects = await Project.find(query)
        .select('-owner -__v')
        .populate('tasks', '-__v -project');

      if (!projects) {
        return fail(res, {
          status: 404,
          message: 'User not identified',
        });
      }

      const data = projects.map((project) => ({
        id: project._id,
        name: project.name,
        tasks: project.tasks.map((task) => ({
          id: task._id,
          name: task.name,
          isDone: task.isDone,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
        })),
      }));

      success(res, { data });
    } catch (err) {
      fail(res);
    }
  },

  async getUserProjectById(req, res) {
    try {
      const project = await Project.findOne({
        _id: req.params.projectId,
        owner: req.user.id,
      }).select('-owner -__v');

      if (!project) {
        return fail(res, {
          status: 404,
          message: 'Project not found',
        });
      }

      success(res, {
        data: {
          id: project._id,
          name: project.name,
          tasks: project.tasks,
        },
      });
    } catch (err) {
      fail(res);
    }
  },

  async createUserProject(req, res) {
    const { value, error } = projectSchema.validate(req.body);

    if (error) {
      return fail(res, {
        status: 400,
        message: getErrorMessage(error),
      });
    }

    try {
      const project = new Project(value);
      const user = await User.findByIdAndUpdate(req.user.id, {
        $push: { projects: project },
      });
      project.owner = user;
      const newProject = await project.save();

      success(res, {
        status: 201,
        data: {
          id: newProject._id,
          name: newProject.name,
          // ignored fields:
          // tasks
          // newProject.owner
          // newProject.__v
        },
      });
    } catch (err) {
      console.log(err);
      fail(res);
    }
  },

  async updateUserProject(req, res) {
    const { value, error } = projectSchema.validate(req.body);

    if (error) {
      return fail(res, {
        status: 400,
        message: getErrorMessage(error),
      });
    }

    try {
      const query = {
        _id: req.params.projectId,
        owner: req.user.id,
      };
      const data = value;
      const options = { new: true };

      const project = await Project.findOneAndUpdate(
        query,
        data,
        options
      ).select('-owner -__v');

      if (!project) {
        return fail(res, {
          status: 404,
          message: 'Project not found',
        });
      }

      success(res, {
        data: {
          id: project._id,
          name: project.name,
          tasks: project.tasks,
        },
      });
    } catch (err) {
      fail(res);
    }
  },

  async removeUserProject(req, res) {
    try {
      const project = await Project.findOneAndDelete({
        _id: req.params.projectId,
        owner: req.user.id,
      }).select('-owner -__v');

      if (!project) {
        return fail(res, {
          status: 404,
          message: 'Project not found',
        });
      }

      await User.findByIdAndUpdate(req.user.id, {
        $pull: { projects: project._id },
      });

      await Task.deleteMany({ project: project._id });

      success(res, {
        data: {
          id: project._id,
          name: project.name,
          tasks: project.tasks,
        },
      });
    } catch (err) {
      fail(res);
    }
  },
};

module.exports = projectController;
