const express = require('express');
const taskController = require('../controllers/task');
const auth = require('../middlewares/auth');

const router = express.Router({ mergeParams: true });

router
  .post('/', auth, taskController.createProjectTask)
  .get('/', auth, taskController.getProjectTasks)
  .get('/:taskId', auth, taskController.getProjectTaskById)
  .put('/:taskId', auth, taskController.updateProjectTask)
  .delete('/:taskId', auth, taskController.removeProjectTask);

module.exports = router;
