const express = require('express');
const projectController = require('../controllers/project');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .post('/', auth, projectController.createUserProject)
  .get('/', auth, projectController.getUserProjects)
  .put('/:projectId', auth, projectController.updateUserProject)
  .delete('/:projectId', auth, projectController.removeUserProject);

module.exports = router;
