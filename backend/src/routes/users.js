const express = require('express');
const userController = require('../controllers/user');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .post('/', userController.createUser)
  .get('/current', auth, userController.getCurrentUser)
  .put('/current', auth, userController.updateCurrentUser)
  .delete('/current', auth, userController.removeCurrentUser);

module.exports = router;
