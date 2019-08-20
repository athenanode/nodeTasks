var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var tasklistController = require('../controllers/tasklistController');
var taskController = require('../controllers/taskController');


/* GET home page. */
router.get('/', userController.loginUserGet);
router.post('/auth', userController.loginUserPost);
router.post('/signup', userController.validateSignUp);
router.post('/createtasklist', tasklistController.createTaskList);
router.post('/createtask', tasklistController.createTaskList);
router.get('/createtasklist', tasklistController.createTaskListGet);




module.exports = router;
