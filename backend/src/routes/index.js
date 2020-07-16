const express = require('express');

const loginRouter = require('./login');
const usersRouter = require('./users');
const projectsRouter = require('./projects');
const tasksRouter = require('./tasks');

const router = express.Router();

router.use('/login', loginRouter);
router.use('/users', usersRouter);
router.use('/users/current/projects', projectsRouter);
router.use('/users/current/projects/:projectId/tasks', tasksRouter);

module.exports = router;
