const projectSchema = require('./schemas/projectSchema');
const Project = require('../models/Project');
const User = require('../models/User');
const Task = require('../models/Task');
const { success, fail } = require('../utils/responder');

const projectController = {
  async getUserProjects(req, res) {
    try {
      const userProjects = await User.findById(req.user.id).populate({
        path: 'projects',
        populate: { path: 'tasks', model: 'Task' },
      });

      success(res, {
        data: {
          projects: userProjects.projects,
        },
      });
    } catch (err) {
      fail(res);
    }
  },

  async getUserProjectById(req, res) {
    try {
      const project = await Project.findOne({
        _id: req.params.projectId,
        owner: req.user.id,
      });

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
        message: error.details[0].message,
      });
    }

    try {
      const project = new Project(value);
      const user = await User.findByIdAndUpdate(req.user.id, {
        $push: { projects: project },
      });
      project.owner = user;
      await project.save();

      success(res, {
        status: 201,
        data: {
          id: project._id,
          name: project.name,
        },
      });
    } catch (err) {
      fail(res);
    }
  },

  async updateUserProject(req, res) {
    const { value, error } = projectSchema.validate(req.body);

    if (error) {
      return fail(res, {
        status: 400,
        message: error.details[0].message,
      });
    }

    try {
      const query = {
        _id: req.params.projectId,
        owner: req.user.id,
      };
      const data = value;
      const options = {
        new: true,
      };

      const project = await Project.findOneAndUpdate(query, data, options);

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
      });

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
          owner: project.owner,
        },
      });
    } catch (err) {
      fail(res);
    }
  },
};

module.exports = projectController;
